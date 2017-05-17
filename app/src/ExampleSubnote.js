// import node packages
import React, {Component} from 'react';

class ExampleSubnote extends Component {

  render () {
    return (
      <div>
        <h3>Subtopic:</h3>
        <h4>{this.props.notebook.subnotes[this.props.match.params.id]['subtopic']}</h4>
        <h3>Note:</h3>
        <p>{this.props.notebook.subnotes[this.props.match.params.id]['note']}</p>
      </div>
    )    
  }
}

export default ExampleSubnote;
