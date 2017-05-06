 // import node packages
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import our routes/views and drive helper functions
import Dashboard from './Dashboard';
import NotebookExplorer from './NotebookExplorer';
import Login from './Login';
import Logout from './Logout';
import FlashcardExplorer from './FlashcardExplorer';
import Review from './Review';
import ExampleEditor from './ExampleEditor';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      initialized: false,
      files: [],
    }
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
    this.listFiles = this.listFiles.bind(this);
    this.createDefaultNotebook = this.createDefaultNotebook.bind(this);
  }
  
  // Google auth2 helper fuctions
  loginUser () {
    window.gapi.auth2.getAuthInstance().signIn().then();
  }
  
  logoutUser () {
    window.gapi.auth2.getAuthInstance().signOut().then();
  }
  
  updateLoginStatus (isSignedIn) {
    this.setState({loggedIn: isSignedIn});
    isSignedIn && console.log(window.gapi);
  }
  
  // drive helper functions
  listFiles () {
    window.gapi.client.drive.files.list({'pageSize': 99, 'fields': "files(id, name)"}).then(function(response) {this.setState({files: response})})
  }
  
  createDefaultNotebook () {
    window.gapi.client.drive.files.create({resource: {'name': 'mysubnotes', 'mimeType': 'text/plain'}, fields:'id'}).then(function(response) {console.log("creating file with id " + response)})
  }
  
  componentDidMount() {
    // load google api libraries, initialize them, and set up login status listener (updateLoginStatus)
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({discoverDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"], clientId: '38703598827-318fe1f76ju71nedjkudad6gcvteglii.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file'}).then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateLoginStatus); // set up listener for login status change
        this.updateLoginStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get()); // get initial login status
        this.setState({initialized: true,}); // let everything know that the libraries have been initialized
      })
    })
  }

  render() {
    return (
      this.state.loggedIn ? 
        (
          <Router>
            <div>
              <Logout logoutUser={this.logoutUser}/>
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/notebook">Notebook Explorer</Link></li>
                <li><Link to="/flashcards">Flashcard Explorer</Link></li>
                <li><Link to="/review">Review</Link></li>
                <li><Link to="/editor">Example Editor</Link></li>
              </ul>
              <Route exact path="/" component={Dashboard} files={this.state.files} listFiles={this.listFiles}/>
              <Route path="/notebook" component={NotebookExplorer}/>
              <Route path="/flashcards" component={FlashcardExplorer}/>
              <Route path="/review" component={Review}/>
              <Route path="/editor" component={ExampleEditor}/>
                </div>
          </Router>
        )
        :
        (
          <Login initialized={this.state.initialized} loginUser={this.loginUser}/>
        ) 
    )
  }
}

export default App;
