import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {createNotebook, uploadNotebook} from './helpers/googleDrive'

class Dashboard extends Component {
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
          <h3>Dashboard</h3>
          <h4>Your Notebooks</h4>
          <ul>
            {Object.entries(this.props.library).map(item => (
              <li key={item[0]}><Link to={"/notebook/" + item[0]}>{item[1]['fileName']}</Link></li>
            ))}
          </ul>
          <h4>New Notebook</h4>
          <form onSubmit={this.newNotebook}>
            <div>            
              <input name="newName" value={this.state.newName} type="text" onChange={this.setNewName}/>.sn
            </div>
            <div>
              <input type="submit" value="Create New Notebook" />
            </div>
          </form>
        </div>
      )
    }
    else {
      return (<div>no subnotes in this notebook</div>)
    }
  }

}

export default Dashboard;
