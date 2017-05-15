 // import node packages
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import UUID from 'uuid';

// import our routes/views
import Dashboard from './Dashboard';
import NotebookExplorer from './NotebookExplorer';
import Login from './Login';
import Logout from './Logout';
import FlashcardExplorer from './FlashcardExplorer';
import Review from './Review';
import ExampleEditor from './ExampleEditor';
import ExampleSubnote from './ExampleSubnote';

class App extends Component {

  constructor(props) {
    super(props);
    this.notebookName = "Gemini Notebook Q";
    this.state = {
      loggedIn: false,
      initialized: false,
      notebook: false,
      notebookDriveId: "",
      tags: {},
      files: [],
    }
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
    this.createNotebook = this.createNotebook.bind(this);
    this.updateNotebook = this.updateNotebook.bind(this);
    this.getDriveFiles = this.getDriveFiles.bind(this);
    this.declareNotebook = this.declareNotebook.bind(this);
    this.updateTags = this.updateTags.bind(this);
    //this.createDefaultNotebook = this.createDefaultNotebook.bind(this);
    //this.logGAPI = this.logGAPI.bind(this);
    //this.driveTest = this.driveTest.bind(this);
  }

  // Google auth2 helper fuctions
  loginUser () {
    window.gapi.auth2.getAuthInstance().signIn().then();
  }

  logoutUser () {
    window.gapi.auth2.getAuthInstance().signOut().then(this.setState({loggedIn: false, notebook: false, tags: {}}));
  }

  updateLoginStatus (isSignedIn) {
    this.setState({loggedIn: isSignedIn});
    isSignedIn && this.getDriveFiles();
  }

  // Google drive functions
  // NOTE: gapi.client.drive is not getting loaded for some yet unknown reason,
  // having to use gapi.client.request instead...
  // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientrequestargs
  // https://developers.google.com/api-client-library/javascript/start/start-js#option-2-use-gapiclientrequest
  // TODO: most or all of these are pretty ugly and are considered tempory. After the midpoint check, we'll clean things up and support multiple subnotes
  // * GET .../files will return deleted files, need to check that files have not been deleted.
  // * Drive API also allows for multiple files with the same name, so need to check for that and handle somehow
  // * make drive function return values and not set state directly, in otherwords use setState function outside of functions that use drive api. type1 functions submit requests to drive api, type2 functions call type1 functions and setState
  // * support multiple notebooks (maybe use a file extension like *.sn)
  // NOTE: Seems like we should be stringify notebook before uploading it to Google drive in updateNotebook() and parsing it when we download it, but it's working as is, and when I tried doing doing that it broke. Maybe Drive API is taking care of it.

  // create "geminiNotebook" file
  createNotebook () {
    const newUUID = UUID.v4()
    const newNotebook = { 
      "rootSubnote": newUUID, 
      "subnotes": { 
        [newUUID]: { 
          "subtopic": "Your new notebook", 
          "note": "Start taking notes here!", 
          "flashcards": [], 
          "tags": [], 
          "subnotes": [] 
        }
      }
    }
    var metaData = {
      "name": this.notebookName,
      "mimeType": "application/json",
    }
    var method = 'POST'
    var path = 'https://www.googleapis.com/drive/v3/files'
    window.gapi.client.request({'path': path, 'method': method, 'body': metaData}).then( (response) => {this.setState({ notebookDriveId: response.result.id }); this.updateNotebook(newNotebook)})
  }

  // get list of files created by subnotes from Drive
  getDriveFiles () {
    var method = 'GET';
    var path = 'https://www.googleapis.com/drive/v3/files';
    window.gapi.client.request({'path': path, 'method': method}).then((response) => {this.setState({files: response.result.files}); this.declareNotebook()});
  }

  // declarative "geminiNotebook" file exits
  declareNotebook () {
    var id = false;
    for (var f = 0; f < this.state.files.length; f++){
      if (this.state.files[f]['name'] === this.notebookName) {
        id = this.state.files[f]['id']
        //console.log("found match with id " + id + "")
      }
    }
    if (id){
      this.setState({notebookDriveId: id});
      var path = 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media';
      var method = 'GET';
      window.gapi.client.request({'path': path, 'method': method}).then((response) => {this.updateNotebook(response.result, false)});
    }
    else {
      this.createNotebook();
    }
  }

  // update "geminiNotebook" file (and state) - assumes id is already in state
  updateNotebook (notebook, upload=true) {
    // update in notebook and tags in state
    this.setState({notebook: notebook});
    this.setState({tags: this.updateTags(notebook)});
    // upload notebook to google drive
    if(upload){
      var params = {
        "uploadType" : "media",
      }
      var method = 'PATCH'
      var path = 'https://www.googleapis.com/upload/drive/v3/files/' + this.state.notebookDriveId
      window.gapi.client.request({'path': path, 'method': method, 'body': notebook, 'params': params}).then()
    }
  }

  // TODO: get tags from flashcards too (currently only getting from subnotes)
  updateTags (notebook) {
    var notebookTags = {}
    if (typeof notebook.subnotes === 'object') {
      Object.entries(notebook.subnotes).forEach(([uuid, subnote]) => {
        if (Array.isArray(subnote.tags)) {
          subnote.tags.forEach((tag) => {
            notebookTags[tag] = notebookTags[tag] || []
            notebookTags[tag].push(uuid)
          })
        }
      })
      return notebookTags
    }
  }

  // on mount
  componentDidMount() {
    // load Google API libraries, initialize them, and set up login status listener (updateLoginStatus), and anything else that should happen on page load ...
    window.gapi.load('client:auth2', () => {
      // TODO: remove at least clientId to some external source that gets loaded in
      window.gapi.client.init({discoverDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"], clientId: '38703598827-318fe1f76ju71nedjkudad6gcvteglii.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/drive.file'}).then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateLoginStatus); // set up listener for login status change
        this.updateLoginStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get()); // get initial login status
        this.setState({initialized: true,}); // let everything know that the libraries have been initialized
      })
    })
  }

  render() {
    // if logged in and notebook is loaded
    if (this.state.loggedIn && this.state.initialized && this.state.notebook)  {
      return (
        <div>
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
              <Route exact path="/" render={(props) => (<Dashboard notebook={this.state.notebook} {...props} />)}/>
              <Route path="/notebook" render={(props) => (<NotebookExplorer notebook={this.state.notebook} updateNotebook={this.updateNotebook} {...props} />)} />
              <Route path="/flashcards" render={(props) => (<FlashcardExplorer notebook={this.state.notebook} {...props} /> )} />
              <Route path="/review" render={(props) => (<Review notebook={this.state.notebook} {...props} />)}/>
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
      return (<Login initialized={this.state.initialized} loginUser={this.loginUser}/>)
    }
  }
}

export default App;
