import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: #666666;
`
const StyledA = styled.a`
  color: #666666;
`
const Red = styled.span`
  color: #e06666;
`
const Black = styled.span`
  color: black;
`  
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
            <h4>Tags</h4>
            <ul>
              {Object.entries(this.props.tags).map(([tag]) => (
                <li key={tag}><StyledA href="" onClick={(e) => {e.preventDefault(); this.updateTag(tag)}}>{tag}</StyledA></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Subnotes tagged with <Black>{this.state.tagName}</Black></h4><ul>
              {
                Object.entries(this.state.tag).map(([notebookid, notebook]) => (
                  Object.entries(this.state.tag[notebookid]['subnotes']).map(([subnoteid, subnote]) => (
                    <li key={subnoteid}> <StyledLink to={"/notebook/" + notebookid + "/subnote/" + subnoteid }>{notebook.fileName} - <Red>{subnote.subtopic}</Red> </StyledLink> </li>
                  ))
                ))
              }
            </ul>
          </div>
        </div>
      )
    } else {
      return (<div>no tags currently availble</div>)
    }
  }
} 

export default Tags
