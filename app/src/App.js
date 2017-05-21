 // import node packages
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
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
      library: { 
        notebooks: {}
      }
    }
    this.updateLoginStatus = this.updateLoginStatus.bind(this)    
    this.getSubnotes = this.getSubnotes.bind(this)
    this.updateNotebook = this.updateNotebook.bind(this)    
  }
  
  getSubnotes(){
    var notebook = {} 
    // get list of all json files that aren't trashed from user's drive
    getFiles("trashed = false and mimeType = 'application/json'", (response) => {
      // loop through list of files
      Object.entries(response.result.files).forEach(([key,file]) => {
        // see if file as .sn extention
        if (typeof file.name == 'string'){ // add '&& /\.sn$/.test(file.name)' for file extension
          // download files with .sn extensions
          downloadNotebook(file.id, (response) => {
             notebook = response.result
             // TODO validate file against schema should go here
             // store notebook in library
             this.setState({ library: { notebooks: { [file.id]: {notebook: notebook, fileName: file.name }}}})
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
      this.setState({loggedIn: false})
    }
  }

  updateNotebook (notebookid, notebook) {
    this.setState({library: { notebooks: { [notebookid]: notebook }}})
    console.log("updating notebook " + notebook.fileName + " with id of " + notebookid)
  }

  // on mount
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
    // if logged in and notebook is loaded
    if (this.state.loggedIn && this.state.initialized && this.state.library)  {
      // <Route path="/notebook/:notebookid/subnote/:subnoteid" render={(props) => (<ExampleSubnote notebook={this.state.library.notebooks[props.match.notebookid][props.match.subnoteid]} updateNotebook={this.updateNotebook} {...props} />)}/>
      // <Route path="/notebook/:notebookid" render={(props) => (<ExampleNotebook notebook={this.state.library.notebooks[props.match.notebookid]} updateNotebook={this.updateNotebook} {...props} />)} />
      return (
        <div>
          <Router>
            <div>
              <Logout logoutUser={logoutUser}/>
              <ul>
                <li><Link to="/">Library</Link></li>
              </ul>
              <Route exact path="/" render={(props) => (<ExampleLibrary library={this.state.library} {...props} />)}/>
              <Route path="/notebook/edit/:notebookid" render={(props) => (<ExampleEditor notebook={this.state.library.notebooks[props.match.params.notebookid]['notebook']} updateNotebook={this.updateNotebook} {...props} />)} />
            </div>
          </Router>
        </div>
      )
    }
    // logged in but notbook is loading
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
