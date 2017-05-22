// import node packages
import React, {Component} from 'react';
import Tree from './Tree'

class NotebookExplorer extends Component {

  render() {
  return (
    <div>
      <h3>Notebook Explorer</h3>
      <Tree
        notebook={this.props.notebook}
        updateNotebook={this.props.updateNotebook}
        expanded={this.props.expanded}
        updateExpanded={this.props.updateExpanded}
      />
    </div>
  )}
}

export default NotebookExplorer;
