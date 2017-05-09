// import node packages
import React, {Component} from 'react';

class ExampleEditor extends Component {
  
  constructor(props) {
    super(props);
    this.updateNotebookFromElement = this.updateNotebookFromElement.bind(this);
    this.state = {
      msg: ""
    }
  }
  
  updateNotebookFromElement (e) {
    console.log(e)
    var newNotebook  
    // we would want to check against our schema here, but for this we're just making sure it's valid json
    try {
       this.props.updateNotebook(JSON.parse(e.target.value))
       this.setState({msg: "notebook updated"})
    }catch(err) {
      this.setState({msg: "invalid JSON"})
    }
    
  }
  
  render () {
    return (
      this.props.notebook ? (
      <div>
        <h3>Example Editor</h3>
        Temporary page to demonstrate viewing and editing a notebook.
        <div>
          <textarea onChange={this.updateNotebookFromElement} defaultValue={JSON.stringify(this.props.notebook, null, 2)} />
          <div>{this.state.msg}</div>
        </div>
      </div>
    ) : (<h3>loading notebook</h3>)
    )    
  }
}

export default ExampleEditor;
