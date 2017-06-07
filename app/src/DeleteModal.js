import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, modalStyle } from './presenters/ModalStyles'

const propTypes = {
  rowInfo: PropTypes.object.isRequired,
  deleteSubnote: PropTypes.func.isRequired
}

const StyledH3 = styled.h3`
  color: rgb(224, 102, 102);
`

//DeleteModal adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
export default class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
      } //end constructor

    handleOpenModal () {
      this.setState({ showModal: true });
      //console.log(this);
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleSave({ target }) {
      this.props.deleteSubnote(this.props.rowInfo);
      this.handleCloseModal(); //close the modal window
    }

    render () {
      return (
        <div>
          <StyledModalLaunchButton delete onClick={this.handleOpenModal}></StyledModalLaunchButton>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="Delete subnote"
             style={modalStyle}
          >
            <h3>Are you sure you want to delete this subnote?</h3>
            <StyledH3>WARNING: Deleting a subnote will also delete all children of that subnote!</StyledH3>
            <button onClick={this.handleSave}>Delete</button>
            <button onClick={this.handleCloseModal}>Cancel</button>
          </ReactModal>
        </div>
      );
    }
}

DeleteModal.propTypes = propTypes;
