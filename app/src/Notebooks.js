import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {createNotebook, uploadNotebook} from './helpers/googleDrive'
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #666666;
`
const Note = styled.i`
  color: #666666;
  font-size: small;
`  

class Notebooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: ""
    }
    this.newNotebook = this.newNotebook.bind(this)
    this.setNewName = this.setNewName.bind(this)
  }
  
  newNotebook(e) {
    //createNotebook(e.target.value)
    createNotebook(this.state.newName + '.sn', (response) => {uploadNotebook({"subnotes":{},"topLevelSubnotes":[]}, response.result.id, this.props.loadNotebooks)})
    e.preventDefault()
    this.setState({newName: ""})
  }
  
  setNewName(e){
    this.setState({"newName": e.target.value})
  }
  
  render() {
    if (typeof this.props.library !== 'undefined') {
      return(
        <div>

          <h4>Your Notebooks</h4>
          <Note>Click on notebook name to view it</Note>
          <ul>
            {Object.entries(this.props.library).map(item => (
              <li key={item[0]}><StyledLink to={"/notebook/" + item[0]}>{item[1]['fileName']}</StyledLink></li>
            ))}
          </ul>
          <h4>Create New Notebook</h4>
          <form onSubmit={this.newNotebook}>
            <div>            
              <input name="newName" value={this.state.newName} type="text" onChange={this.setNewName}/> <input type="submit" value="Create New Notebook" />
            </div>
          </form>
          <Note>Enter in a name and click button to create a new notebook</Note>
          <div>
            <h5><i>Managing Notebooks</i></h5>
            <Note>Notebooks are stored on your <a href="http://drive.google.com" target="_blank">Google Drive</a>. 
              Go to your <a href="http://drive.google.com" target="_blank">Google Drive</a> to move, upload, download, delete, or share notebooks.</Note> 
          </div>
        </div>
      )
    }
    else {
      return (<div>no subnotes in this notebook</div>)
    }
  }

}

export default Notebooks;
