 // import node packages
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// import our routes/views
import Login from './components/Login';
import Logout from './components/Logout';
import ExampleEditor from './components/ExampleEditor'
import ExampleSubnote from './components/ExampleSubnote'
import ExampleNotebook from './components/ExampleNotebook'
import ExampleLibrary from './components/ExampleLibrary'

// import helpers
import { getDriveConfig } from './configs/driveConfigs'
import { initializeAuthDrive } from './helpers/googleAPI'
import { downloadNotebook, uploadNotebook, createNotebook, getFiles } from './helpers/googleDrive'
import { loginUser, logoutUser, setLogInOutHandler, isUserLoggedIn } from './helpers/googleAuth'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      initialized: false,
      library: {},
      notebooksLoaded: false,
    }
    this.updateLoginStatus = this.updateLoginStatus.bind(this)    
    this.getSubnotes = this.getSubnotes.bind(this)
    this.updateNotebook = this.updateNotebook.bind(this)    
  }
  
  getSubnotes(){
    var library = {} 
    // get list of all json files that aren't trashed from user's drive
    getFiles("trashed = false and mimeType = 'application/json'", (response) => {
      // loop through list of files
      var numFilesProcessed = 0
      const numFiles = Object.keys(response.result.files).length
      Object.entries(response.result.files).forEach(([key,file]) => {
        // see if file as .sn extention
        if (typeof file.name === 'string'){ // add '&& /\.sn$/.test(file.name)' for file extension
          // download files with .sn extensions
          downloadNotebook(file.id, (response) => {
             library[file.id] = {}
             library[file.id]['notebook'] = response.result
             library[file.id]['fileName'] = file.name
             // TODO validate file against schema should go here
             numFilesProcessed++
             if (numFilesProcessed == numFiles) { // last file downloaded
               this.setState({library: library}, this.setState({notebooksLoaded: true}))
             } 
          })
        }
      }) 
    })
  }

  updateLoginStatus (isSignedIn) {
    this.setState({loggedIn: isSignedIn})
    // on login
    if (isSignedIn){
      // get subnote files meta data
      this.getSubnotes()
    }
    // on logout
    else {
      // clean up state
      this.setState({loggedIn: false, library: {}, notebooksLoaded: false})
    }
  }
/*
  updateNotebook (notebookid, notebook) {
    this.setState((prev) => { 
      var newState = Object.assign({}, prev); 
      newState.library[notebookid]['notebook'] = notebook
      console.log(newState) 
      return newState
    }
  )
  }
*/
updateNotebook (notebookid, notebook) {
  this.setState((prev) => { 
    return prev.library[notebookid]['notebook'] = notebook
  })
}

  componentDidMount() {
    initializeAuthDrive(
      getDriveConfig(), 
      () => {
        setLogInOutHandler(this.updateLoginStatus) 
        this.updateLoginStatus(isUserLoggedIn())
        this.setState({initialized: true})
      }
    )
  }

  render() {
    // if logged in and notebooks are loaded
    if (this.state.loggedIn && this.state.initialized && this.state.library && this.state.notebooksLoaded)  {
      return (
        <div>
          <Router>
            <div>
              <Logout logoutUser={logoutUser}/>
              <ul>
                <li><Link to="/">Library</Link></li>
              </ul>
              <Switch>
                <Route exact path="/" render={(props) => (<ExampleLibrary library={this.state.library} {...props} />)}/>
                <Route path="/notebook/:notebookid/subnote/:subnoteid" render={(props) => (<ExampleSubnote notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} {...props} />)}/>
                <Route path="/notebook/edit/:notebookid" render={(props) => (<ExampleEditor notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} {...props} />)} />
                <Route path="/notebook/:notebookid" render={(props) => (<ExampleNotebook notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} {...props} />)} />
              </Switch>
            </div>
          </Router>
        </div>
      )
    }
    // logged in but notebooks are still loading
    else if (this.state.loggedIn && this.state.initialized) {
      return (<h3>loading notebook</h3>)
    }
    // not logged in or initialized yet
    else {
      return (<Login initialized={this.state.initialized} loginUser={loginUser}/>)
    }
  }
}

export default App;
