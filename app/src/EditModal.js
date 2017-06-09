import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, StyledTextArea, StyledInput, CancelButton, SubnoteButton, modalStyle } from './presenters/ModalStyles'

import TagListContainer from './containers/TagListContainer';

const propTypes = {
  rowInfo: PropTypes.object.isRequired,
  replaceSubnote: PropTypes.func.isRequired
}

//EditModal adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
export default class EditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
          showModal: false,
          subtopic: this.props.rowInfo.node.title,
          note: this.props.rowInfo.node.subtitle,
          tags: this.props.rowInfo.node.tags || [],
          flashcards: this.props.rowInfo.node.flashcards || []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
      } //end constructor

    //resolve conflicts with incorrect rowInfo causing state to hold values from wrong node
    componentWillReceiveProps(nextProps) {
      if(this.props !== nextProps) {
        this.setState({
          subtopic: nextProps.rowInfo.node.title,
          note: nextProps.rowInfo.node.subtitle,
          tags: nextProps.rowInfo.node.tags || [],
          flashcards: nextProps.rowInfo.node.flashcards || []
        });
      }
    }

    handleOpenModal () {
      this.setState({ showModal: true });
    }

    handleCloseModal () {
      //reset state of modal and close it (prevents unsaved edits from reappearing if edit is clicked again)
      this.setState({
        subtopic: this.props.rowInfo.node.title,
        note: this.props.rowInfo.node.subtitle,
        tags: this.props.rowInfo.node.tags || [],
        flashcards: this.props.rowInfo.node.flashcards || [],
        showModal: false
      });
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
      this.props.replaceSubnote(this.props.rowInfo, this.state);
      this.handleCloseModal(); //close the modal window
    }

    render () {
      return (
        <div>
          <StyledModalLaunchButton edit onClick={this.handleOpenModal}></StyledModalLaunchButton>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Edit subnote"
            style={modalStyle}
          >
          <StyledModalDiv>
              <StyledModalP subtopic> Subtopic: </StyledModalP>
              <StyledInput subtopic type="text" name="subtopic" defaultValue={this.props.rowInfo.node.title} onChange={this.handleChange}/>
              <StyledModalP note> Note: </StyledModalP>
              <StyledTextArea note rows="10" cols="75" name="note" defaultValue={this.props.rowInfo.node.subtitle} onChange={this.handleChange}/>
              <StyledModalP > Tags: </StyledModalP>
              <TagListContainer
                tags={this.state.tags}
                handleAdd={this.handleTagAdd}
                handleDelete={this.handleTagDelete} />
              </StyledModalDiv>
              <SubnoteButton onClick={this.handleSave}>Save Edits</SubnoteButton>
              <CancelButton onClick={this.handleCloseModal}>Cancel Edit</CancelButton>
          </ReactModal>
        </div>
      );
    }
}

EditModal.propTypes = propTypes;
