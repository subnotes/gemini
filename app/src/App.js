 // import node packages
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'
import styled from 'styled-components'

// import our routes/views
import Login from './Login'
import Logout from './Logout'
import Notebooks from './Notebooks'
import FlashcardExplorer from './FlashcardExplorer'
import NotebookExplorer from './NotebookExplorer'
import Review from './Review'
import Tags from './Tags'
import TagTest from './TagTest'

// import helpers
import { getDriveConfig } from './configs/driveConfigs'
import { initializeAuthDrive } from './helpers/googleAPI'
import { downloadNotebook, uploadNotebook, createNotebook, getFiles } from './helpers/googleDrive'
import { loginUser, logoutUser, setLogInOutHandler, isUserLoggedIn, getEmail } from './helpers/googleAuth'

// style components

const MainContainer = styled.div`
  margin: 20px;
`
const TitleBar = styled.div`
  display:flex;
  justify-content: center;
`
const Title = styled.h1`
  font-weight: bold;
  flex: 1;
  align-self: flex-end;
  `
const Red = styled.span`
  color: #e06666;
  `
const Blue = styled.span`
  color: #6fa8dc;
`
const UserName = styled.span`
  flex: 1;
  align-self: flex-end;
  margin: auto;
`
const NavBar = styled.div`
  display: flex;
  justify-content: flex-start
`
const StyledLink = styled(NavLink)`
  flex: 0 1 auto;
  text-decoration: none;
  color: gray;
  margin-right: 20px;
  &.${(props) => props.activeClassName} {
    color: black;
    font-weight: bold;
  }
`

StyledLink.defaultProps = { activeClassName: 'active'}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      loggedIn: false,
      initialized: false,
      library: {},
      tags: {},
      notebooksLoaded: false,
    }
    this.updateLoginStatus = this.updateLoginStatus.bind(this)
    this.loadNotebooks = this.loadNotebooks.bind(this)
    this.downloadNotebooks = this.downloadNotebooks.bind(this)
    this.updateNotebook = this.updateNotebook.bind(this)
    this.updateNotebookExpansion = this.updateNotebookExpansion.bind(this)
    this.createTagIndex = this.createTagIndex.bind(this)
  }

  createTagIndex() {
    var tags = {}
    // loop through notebooks
    for(var [notebookid, notebookPlusMeta] of Object.entries(this.state.library)){
      // loop through subnotes
      for(var [subnoteid, subnote] of Object.entries(notebookPlusMeta.notebook.subnotes)){
        // loop through tags
        if (typeof subnote.tags != 'undefined'){
          for(const tag of subnote.tags){
            tags[tag] = tags[tag] || {}
            tags[tag][notebookid] = tags[tag][notebookid] || {}
            tags[tag][notebookid]['subnotes'] = tags[tag][notebookid]['subnotes'] || {}
            tags[tag][notebookid]['subnotes'][subnoteid] = tags[tag][notebookid]['subnotes'][subnoteid] || {}
            tags[tag][notebookid]['fileName'] = tags[tag][notebookid]['fileName'] || this.state.library[notebookid]['fileName']
            tags[tag][notebookid]['subnotes'][subnoteid]['subtopic'] = tags[tag][notebookid]['subnotes'][subnoteid]['subtopic'] || this.state.library[notebookid]['notebook']['subnotes'][subnoteid]['subtopic']
          }
        }
      }
    }
    this.setState({tags : tags})
  }
  
  loadNotebooks(){ // get list of notebooks and download them
    // get list of all writable json files that aren't trashed from user's drive
    var email = getEmail()
    var notebooks = []
    getFiles("trashed = false and mimeType = 'application/json' and '" + email + "' in writers", (response) => {
      // loop through list of files
      response.result.files.forEach((file) => {
        // see if file as .sn extention
        if (typeof file.name === 'string' && /\.sn$/.test(file.name)){ // checks for .sn file extension
          file.writable = true
          notebooks.push(file)
        }
      })
      getFiles("trashed = false and mimeType = 'application/json' and not '" + email + "' in writers", (response) => {
        // loop through list of files
        response.result.files.forEach((file) => {
          // see if file as .sn extention
          if (typeof file.name === 'string' && /\.sn$/.test(file.name)){ // checks for .sn file extension
            file.writable = false
            notebooks.push(file)
          }
        })
        this.downloadNotebooks(notebooks)
      })
    })
  }

  downloadNotebooks(notebooks){
    var library = {}
    var counter = 1
    if (notebooks.length == 0) {
      this.setState({library: library}, this.setState({notebooksLoaded: true}))
    } else {
      notebooks.forEach((file) => {
        downloadNotebook(file.id, (response) => {
          // load into library if it passes checks
          // TODO validate file against schema should go here
          library[file.id] = {}
          library[file.id]['notebook'] = response.result
          library[file.id]['fileName'] = file.name
          library[file.id]['writable'] = file.writable
          library[file.id]['expanded'] = []
          // if last file load library to state
          if (counter == notebooks.length){
            this.setState({library: library}, () => {this.setState({notebooksLoaded: true}); this.createTagIndex()}) // TODO set callback to create library indexes
          }
          counter++
        })
      })
    }
  }

  updateLoginStatus (isSignedIn) {
    this.setState({loggedIn: isSignedIn})
    // on login
    if (isSignedIn){
      // get subnote files meta data
      this.loadNotebooks()
      this.setState({user: getEmail()})
    }
    // on logout
    else {
      // clean up state
      this.setState({loggedIn: false, library: {}, tags: {}, notebooksLoaded: false})
    }
  }

  updateNotebook (notebookId, notebook) {
    // this.setState((prev) => {
    //   return prev.library[notebookId]['notebook'] = notebook
    // })
    var libraryCopy = JSON.parse(JSON.stringify(this.state.library));
    libraryCopy[notebookId]['notebook'] = notebook;
    this.setState({library: libraryCopy}, this.createTagIndex);
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
        <MainContainer>
          <Router>
            <div>
              <TitleBar> <Title><Red>sub</Red><Blue>notes</Blue></Title> <UserName> You are logged in as {this.state.user}  <Logout logoutUser={logoutUser}/> </UserName> </TitleBar>
              <NavBar>
                <StyledLink exact to="/">Notebooks</StyledLink>
                <StyledLink to="/review">Review</StyledLink>
                <StyledLink to="/flashcards">Flashcard Explorer</StyledLink>
                <StyledLink to="/tags">Tags</StyledLink>
              </NavBar>
              <Switch>
                <Route exact path="/" render={(props) => (<Notebooks library={this.state.library} loadNotebooks={this.loadNotebooks} {...props} />)}/>
                <Route path="/notebook/:notebookid/subnote/:subnoteid" render={(props) => (<NotebookExplorer notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} updateNotebookExpansion={this.updateNotebookExpansion} {...props} />)}/>
                <Route path="/notebook/:notebookid" render={(props) => (<NotebookExplorer notebookPlusMeta={this.state.library[props.match.params.notebookid]} updateNotebook={this.updateNotebook} updateNotebookExpansion={this.updateNotebookExpansion} {...props} />)}/>
                <Route path="/flashcards" render={(props) => (<FlashcardExplorer library={this.state.library} updateNotebook={this.updateNotebook} {...props} />)} />
                <Route path="/review" render={(props) => (<Review library={this.state.library} updateNotebook={this.updateNotebook} {...props} />)} />
                <Route path="/tags" render={(props) => (<Tags tags={this.state.tags} {...props} />)} />
                <Route path="/tagtest" render={(props) => (<TagTest updateNotebook={this.updateNotebook} {...props} />)} />
              </Switch>
            </div>
          </Router>
        </MainContainer>
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
