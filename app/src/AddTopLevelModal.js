import React, { Component } from 'react';
import ReactModal from 'react-modal';
import UUID from 'uuid';
import PropTypes from 'prop-types';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, modalStyle } from './presenters/ModalStyles'

import TagListContainer from './containers/TagListContainer';

const propTypes = {
  match: PropTypes.object.isRequired,
  notebookPlusMeta: PropTypes.object,
  updateNotebook: PropTypes.func.isRequired
}

//AddTopLevelModal adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
export default class AddTopLevelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          subtopic: "",
          note: "",
          tags: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addTopLevelSubnote = this.addTopLevelSubnote.bind(this);
      } //end constructor

    handleOpenModal () {
      this.setState({ showModal: true });
      //console.log(this);
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleChange({ target }) {
      this.setState({
        [target.name]: target.value
      });
    }

    handleTagAdd (tag) {
      var newTags = this.state.tags.slice();
      newTags.push(tag);
      this.setState({ tags: newTags });
    } // end handleTagAdd

    handleTagDelete (idx) {
      var newTags = this.state.tags.slice();
      newTags.splice(idx, 1);
      this.setState({ tags: newTags });
    } // end handleTagDelete

    handleSave({ target }) {
      this.addTopLevelSubnote(this.state);
      this.handleCloseModal(); //close the modal window
    }

    addTopLevelSubnote(newValues) {
      //create new node to add to notebook
      var newNode = {};
      var newNodeID = UUID.v4();
      newNode.subtopic = newValues.subtopic;
      newNode.note = newValues.note;
      if (newValues.tags.length > 0) {
        newNode.tags = newValues.tags;
      }
      //not creating flashcards array here, as flashcards are not being passed in newValues here and are not required for every node

      var notebookCopy = JSON.parse(JSON.stringify(this.props.notebookPlusMeta.notebook));

      notebookCopy.topLevelSubnotes.push(newNodeID); //add node id to topLevelSubnotes array
      notebookCopy.subnotes[newNodeID] = newNode; //add newNode to notebook

      this.props.updateNotebook(this.props.match.params.notebookid, notebookCopy); //update notebook and write to google drive
    }

    render () {
      return (
        <div>
          <StyledModalDiv inline>
            <StyledModalLaunchButton addTopLevel onClick={this.handleOpenModal}></StyledModalLaunchButton>
            <p>Add Top Level Subnote</p>
          </StyledModalDiv>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Add top level subnote"
            style={modalStyle}
          >
            <StyledModalDiv>
              <StyledModalP subtopic> Subtopic: </StyledModalP>
              <input type="text" name="subtopic" onChange={this.handleChange}/>
              <StyledModalP note> Note: </StyledModalP>
              <textarea rows="10" cols="75" name="note" onChange={this.handleChange}/>
              <StyledModalP > Tags: </StyledModalP>
              <TagListContainer
                tags={this.state.tags}
                handleAdd={this.handleTagAdd}
                handleDelete={this.handleTagDelete} />
            </StyledModalDiv>
            <button onClick={this.handleSave}>Add Subnote</button>
            <button onClick={this.handleCloseModal}>Cancel</button>
          </ReactModal>
        </div>
      );
    }
}

AddTopLevelModal.propTypes = propTypes;
