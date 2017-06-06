import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, modalStyle } from './presenters/ModalStyles'

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
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
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

    handleTagChange({ target }) {
      var tagNum = parseInt(target.name.substr(3), 10); //get index of tag array (gets rid of "tag" from target name)
      var tagsCopy = this.state.tags.slice();
      tagsCopy[tagNum] = target.value;
      this.setState({
        tags: tagsCopy
      });
    }

    handleSave({ target }) {
      this.props.addSubnote(this.props.rowInfo, this.state);
      this.handleCloseModal(); //close the modal window
    }

    render () {
      var tagArray = [];
      var numTags = 5; //number of empty tag text inputs to display
      for (var i = 0; i < numTags; i++) {
        var tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} onChange={this.handleTagChange}/>);
      }

      return (
        <div>
          <StyledModalLaunchButton add onClick={this.handleOpenModal}></StyledModalLaunchButton>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Add subnote"
            style={modalStyle}
          >
            <StyledModalDiv>
              <StyledModalP subtopic> Subtopic: </StyledModalP>
              <input type="text" name="subtopic" onChange={this.handleChange}/>
              <StyledModalP note> Note: </StyledModalP>
              <textarea rows="10" cols="75" name="note" onChange={this.handleChange}/>
              <StyledModalP > Tags: </StyledModalP>
              {tagArray}
            </StyledModalDiv>
            <button onClick={this.handleSave}>Add Subnote</button>
            <button onClick={this.handleCloseModal}>Cancel</button>
          </ReactModal>
        </div>
      );
    }
}

AddModal.propTypes = propTypes;
