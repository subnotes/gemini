import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {},
      tagName: "..."
    }
    this.updateTag = this.updateTag.bind(this)
  }
  
  updateTag(tag){
    this.setState({tag : this.props.tags[tag], tagName: tag})
  }
  
  render(){
    if (typeof this.props.tags !== 'undefined') { 
      return (
        <div>
          <div>
            <h2>Tags</h2>
            {Object.entries(this.props.tags).map(([tag]) => (
              <li key={tag}><button onClick={() => {this.updateTag(tag)}}>{tag}</button></li>
            ))}
          </div>
          <div>
            <h2>Subnotes tagged with {this.state.tagName}</h2>
            {
              Object.entries(this.state.tag).map(([notebookid, notebook]) => (
                Object.entries(this.state.tag[notebookid]['subnotes']).map(([subnoteid, subnote]) => (
                  <li key={subnoteid}> <Link to={"/notebook/" + notebookid + "/subnote/" + subnoteid }>{notebook.fileName} - {subnote.subtopic} </Link> </li>
                ))
              ))
            }
          </div>
        </div>
      )
    } else {
      return (<div>no tags currently availble</div>)
    }
  }
} 

export default Tags
