// import node packages
import React, {Component} from 'react';
import Tree from './Tree'

class NotebookExplorer extends Component {

  render() {
  return (
    <div>
      <h3>Notebook Explorer</h3>
      <Tree
        notebookPlusMeta={this.props.notebookPlusMeta}
        updateNotebook={this.props.updateNotebook}
        updateNotebookExpansion={this.props.updateNotebookExpansion}
        match={this.props.match}
      />
    </div>
  )}
}

export default NotebookExplorer;
