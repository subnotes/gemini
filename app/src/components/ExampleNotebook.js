// import node packages
import React, {Component} from 'react';

class ExampleSubnote extends Component {

  render () {
    return (
      <div>
        <h3>Notebook:</h3>
        <h4>{typeof this.props.notebook.subnotes[this.props.match.params.notebookid]['fileName'] !== 'undefined' && typeof this.props.notebook.subnotes[this.props.match.params.notebookid]['fileName']}</h4>
      </div>
    )    
  }
}

export default ExampleSubnote;
