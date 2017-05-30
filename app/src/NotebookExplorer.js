// import node packages
import React, {Component} from 'react';
import Tree from './Tree';
import AddTopLevelModal from './AddTopLevelModal';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object.isRequired,
  notebookPlusMeta: PropTypes.object,
  updateNotebook: PropTypes.func.isRequired,
  updateNotebookExpansion: PropTypes.func.isRequired
}

export default class NotebookExplorer extends Component {

  render() {
  return (
    <div>
      <h3>Notebook Explorer</h3>
      <AddTopLevelModal
        notebookPlusMeta={this.props.notebookPlusMeta}
        updateNotebook={this.props.updateNotebook}
        match={this.props.match}
      />
      <Tree
        notebookPlusMeta={this.props.notebookPlusMeta}
        updateNotebook={this.props.updateNotebook}
        updateNotebookExpansion={this.props.updateNotebookExpansion}
        match={this.props.match}
      />
    </div>
  )}
}

NotebookExplorer.propTypes = propTypes;
