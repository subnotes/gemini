 // import node packages
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// import our routes/views
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard'
import FlashcardExplorer from './FlashcardExplorer'
import NotebookExplorer from './NotebookExplorer'
import Review from './Review'

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
    this.updateNotebookExpansion = this.updateNotebookExpansion.bind(this)
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
             library[file.id]['expanded'] = []
             // TODO validate file against schema should go here
             numFilesProcessed++
             if (numFilesProcessed === numFiles) { // last file downloaded
               this.setState({library: library}, this.setState({notebooksLoaded: true})) // TODO set callback to create library indexes
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

  updateNotebook (notebookId, notebook) {
    // this.setState((prev) => {
    //   return prev.library[notebookId]['notebook'] = notebook
    // })
    var libraryCopy = JSON.parse(JSON.stringify(this.state.library));
    libraryCopy[notebookId]['notebook'] = notebook;
    this.setState({library: libraryCopy});
    // TODO: update notebook indexes (derived)
    // TODO: update library indexes
    // TODO: call cleanNotebook here
    uploadNotebook(notebook, notebookId)
  }

  updateNotebookExpansion (notebookId, expanded) {
    // this.setState((prev) => {
    //   return prev.library[notebookId]['expanded'] = expanded
    // })
    var libraryCopy = JSON.parse(JSON.stringify(this.state.library));
    libraryCopy[notebookId]['expanded'] = expanded;
    this.setState({library: libraryCopy});
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
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/review">Review</Link></li>
                <li><Link to="/flashcards">Flashcard Explorer</Link></li>
              </ul>
              <Switch>
                <Route exact path="/" render={(props) => (<Dashboard library={this.state.library} {...props} />)}/>
                <Route path="/notebook/:notebookid/subnote/:subnoteid" render={(props) => (<NotebookExplorer notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} updateNotebookExpansion={this.updateNotebookExpansion} {...props} />)}/>
                <Route path="/notebook/:notebookid" render={(props) => (<NotebookExplorer notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} updateNotebookExpansion={this.updateNotebookExpansion} {...props} />)}/>
                <Route path="/flashcards" render={(props) => (<FlashcardExplorer library={this.state.library} updateNotebook={this.updateNotebook} {...props} />)} />
                <Route path="/review" render={(props) => (<Review library={this.state.library} updateNotebook={this.updateNotebook} {...props} />)} />
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
