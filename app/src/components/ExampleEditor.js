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
    // we would want to check against our schema here, but in this example we're just making sure it's valid json
    try {
       this.props.updateNotebook(this.props.match.params.notebookid, JSON.parse(e.target.value))
       this.setState({msg: "notebook updated"})
    }catch(err) {
      this.setState({msg: "invalid JSON : " + err})
    }    
  }
  
  render () {
    if (typeof this.props.notebookPlusMeta === 'undefined' || typeof this.props.notebookPlusMeta.notebook === 'undefined') {
      return (<h3>Sorry, we couldn't load that notebook</h3>)
    } else {
      return (
        <div>
          <h3>Example Editor: {this.props.notebookPlusMeta.fileName}</h3>
          Temporary page to demonstrate viewing and editing a "raw" notebook. (only validates JSON not subnote schema)
          <div>
            <textarea rows="40" cols="75" onChange={this.updateNotebookFromElement} defaultValue={JSON.stringify(this.props.notebookPlusMeta.notebook, null, 2)} />
            <div>{this.state.msg}</div>
          </div>
        </div>
      )    
    }
  }
}

export default ExampleEditor;
