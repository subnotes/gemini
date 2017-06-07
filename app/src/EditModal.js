import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, modalStyle } from './presenters/ModalStyles'

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
        this.handleTagChange = this.handleTagChange.bind(this);
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

    handleTagChange({ target }) {
      var tagNum = parseInt(target.name.substr(3), 10); //get index of tag array (gets rid of "tag" from target name)
      var tagsCopy = this.state.tags.slice();
      tagsCopy[tagNum] = target.value;
      if (tagsCopy[tagNum] === "") { //if tag is now an empty string, delete it
        tagsCopy.splice(tagNum, 1);
      }
      this.setState({
        tags: tagsCopy
      });
    }

    handleSave({ target }) {
      this.props.replaceSubnote(this.props.rowInfo, this.state);
      this.handleCloseModal(); //close the modal window
    }

    render () {
      var tagArray = [];
      var numTags = 5; //number of tag inputs to display
      for (var i = 0; i < this.state.tags.length; i++) { //prepopulate tags
        var tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} defaultValue={this.state.tags[i]} onChange={this.handleTagChange}/>);
      }
      for (i; i < numTags; i++) { //empty tag inputs
        tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} onChange={this.handleTagChange}/>);
      }

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
              <input type="text" name="subtopic" defaultValue={this.props.rowInfo.node.title} onChange={this.handleChange}/>
              <StyledModalP note> Note: </StyledModalP>
              <textarea rows="10" cols="75" name="note" defaultValue={this.props.rowInfo.node.subtitle} onChange={this.handleChange}/>
              <StyledModalP > Tags: </StyledModalP>
              {tagArray}
              <button onClick={this.handleSave}>Save Edits</button>
              <button onClick={this.handleCloseModal}>Cancel Edit</button>
            </StyledModalDiv>
          </ReactModal>
        </div>
      );
    }
}

EditModal.propTypes = propTypes;
