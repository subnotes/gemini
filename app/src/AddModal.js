import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, StyledInput, StyledTextArea, CancelButton, SubnoteButton, modalStyle } from './presenters/ModalStyles'

import TagListContainer from './containers/TagListContainer';

const propTypes = {
  rowInfo: PropTypes.object.isRequired,
  addSubnote: PropTypes.func.isRequired
}

//AddModal adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
export default class AddModal extends Component {
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
      } //end constructor

    handleOpenModal () {
      this.setState({ showModal: true });
      //console.log(this);
    }

    handleCloseModal () {
      this.setState({ showModal: false,
                      subtopic: "",
                      note: "",
                      tags: [] });
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
      this.props.addSubnote(this.props.rowInfo, this.state);
      this.handleCloseModal(); //close the modal window
    }

    render () {
      return (
        <div>
          <StyledModalLaunchButton add onClick={this.handleOpenModal}></StyledModalLaunchButton>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Add subnote"
            style={modalStyle}
          >
            <StyledModalDiv>
              <StyledModalP bigText subtopic> Subtopic: </StyledModalP>
              <StyledInput subtopic type="text" name="subtopic" onChange={this.handleChange}/>
              <StyledModalP bigText note> Note: </StyledModalP>
              <StyledTextArea note rows="10" cols="75" name="note" onChange={this.handleChange}/>
              <StyledModalP bigText> Tags: </StyledModalP>
              <TagListContainer
                tags={this.state.tags}
                handleAdd={this.handleTagAdd}
                handleDelete={this.handleTagDelete} />
            </StyledModalDiv>
            <SubnoteButton onClick={this.handleSave}>Add Subnote</SubnoteButton>
            <CancelButton onClick={this.handleCloseModal}>Cancel</CancelButton>
          </ReactModal>
        </div>
      );
    }
}

AddModal.propTypes = propTypes;
