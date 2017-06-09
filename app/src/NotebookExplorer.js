// import node packages
import React, {Component} from 'react';
import Tree from './Tree';
import TreeReadOnly from './TreeReadOnly';
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
    color: rgb(224, 102, 102);
  }

  .rst__rowSubtitle {
    display: block;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: 250px;
    max-height: 3em;
    color: rgb(111, 168, 220);
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

  .rst__rowLandingPad {
      &::before {
          background-color: rgb(111,168,220);
      }
  }

  .rst__collapseButton, .rst__expandButton {
      box-shadow: None;
      border: 1px solid #666666;

      &:focus {
          box-shadow: None;
      }
  }
`

const StyledTreeReadOnly = styled(TreeReadOnly)`
  .rst__rowTitle {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
    padding-bottom: 20px;
    color: rgb(224, 102, 102);
  }

  .rst__rowSubtitle {
    display: block;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: 250px;
    max-height: 3em;
    color: rgb(111, 168, 220);
  }

  .rst__rowContents {
    border: solid rgb(111,168,220) 1px;
    border-radius: 5px;
    box-shadow: None;
  }

  .rst__collapseButton, .rst__expandButton {
      box-shadow: None;
      border: 1px solid #666666;

      &:focus {
          box-shadow: None;
      }
  }
`

export default class NotebookExplorer extends Component {

  render() {
    if (typeof this.props.notebookPlusMeta === 'undefined' || typeof this.props.notebookPlusMeta.notebook === 'undefined') {
      return (<h3>Sorry, we could not load that notebook.</h3>)
    } else if (this.props.notebookPlusMeta.writable === true) { //writable notebook
        return (
          <div>
            <h3>Current Notebook: {this.props.notebookPlusMeta.fileName}</h3>
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
      else { //read-only notebook
        return (
          <div>
            <h3>Current Notebook: {this.props.notebookPlusMeta.fileName} (Read-Only)</h3>
            <StyledTreeReadOnly
              notebookPlusMeta={this.props.notebookPlusMeta}
              updateNotebookExpansion={this.props.updateNotebookExpansion}
              match={this.props.match}
            />
          </div>
        )
      }
  }
}

NotebookExplorer.propTypes = propTypes;
