 // import node packages
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import our routes/views
import Dashboard from './components/Dashboard';
import NotebookExplorer from './components/NotebookExplorer';
import Login from './components/Login';
import Logout from './components/Logout';
import FlashcardExplorer from './components/FlashcardExplorer';
import Review from './components/Review';
import ExampleEditor from './components/ExampleEditor'
import ExampleSubnote from './components/ExampleSubnote'

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
        'notebooks': {}
      }
    }
    this.updateLoginStatus = this.updateLoginStatus.bind(this)    
    this.getSubnotes = this.getSubnotes.bind(this)    
  }
  
  getSubnotes(){
    getFiles(
      "trashed = false and mimeType = 'application/json'", 
      (response) => {
        Object.entries(response.result.files).forEach(([key,file]) => {
          if (typeof file.name == 'string' && /\.sn$/.test(file.name)){ // add '&& /\.sn$/.test(file.name)' for file extension
            this.setState((prevState) => { return {library: {[file.id]: file}}})
          }
        }) 
      }
    )
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
    if (this.state.loggedIn && this.state.initialized && this.state.notebook)  {
      return (
        <div>
          <Router>
            <div>
              <Logout logoutUser={logoutUser}/>
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/notebook">Notebook Explorer</Link></li>
                <li><Link to="/flashcards">Flashcard Explorer</Link></li>
                <li><Link to="/review">Review</Link></li>
                <li><Link to="/editor">Example Editor</Link></li>
              </ul>
              <Route exact path="/" render={(props) => (<Dashboard notebook={this.state.notebook} {...props} />)}/>
              <Route path="/notebook" render={(props) => (<NotebookExplorer notebook={this.state.notebook} updateNotebook={this.updateNotebook} {...props} />)} />
              <Route path="/flashcards" component={FlashcardExplorer}/>
              <Route path="/review" component={Review}/>
              <Route path="/editor" render={(props) => (<ExampleEditor notebook={this.state.notebook} updateNotebook={this.updateNotebook} {...props} />)} />
              <Route path="/subnote/:id" render={(props) => (<ExampleSubnote notebook={this.state.notebook} updateNotebook={this.updateNotebook} {...props} />)}/>
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
