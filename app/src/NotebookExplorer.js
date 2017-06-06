// import node packages
import React, {Component} from 'react';
import Tree from './Tree';
import AddTopLevelModal from './AddTopLevelModal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  match: PropTypes.object.isRequired,
  notebookPlusMeta: PropTypes.object,
  updateNotebook: PropTypes.func.isRequired,
  updateNotebookExpansion: PropTypes.func.isRequired
}

const StyledTree = styled(Tree)`
  .rst__rowTitle {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
    padding-bottom: 20px;
  }

  .rst__rowSubtitle {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }

  .rst__rowContents {
    border: solid rgb(111,168,220) 1px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: None;
  }

  .rst__moveHandle {
    background: #BBB url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_view_headline_black_24px.svg) no-repeat center;
    border: solid rgb(111,168,220) 1px;
    border-right: None;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: None;
    opacity: 0.65;
  }
`

export default class NotebookExplorer extends Component {

  render() {
    if (typeof this.props.notebookPlusMeta === 'undefined' || typeof this.props.notebookPlusMeta.notebook === 'undefined') {
      return (<h3>Sorry, we could not load that notebook.</h3>)
    } else {
        return (
          <div>
            <h3>{this.props.notebookPlusMeta.fileName}</h3>
            <AddTopLevelModal
              notebookPlusMeta={this.props.notebookPlusMeta}
              updateNotebook={this.props.updateNotebook}
              match={this.props.match}
            />
            <StyledTree
              notebookPlusMeta={this.props.notebookPlusMeta}
              updateNotebook={this.props.updateNotebook}
              updateNotebookExpansion={this.props.updateNotebookExpansion}
              match={this.props.match}
            />
          </div>
        )
      }
  }
}

NotebookExplorer.propTypes = propTypes;
