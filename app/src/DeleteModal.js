import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

const propTypes = {
  rowInfo: PropTypes.object.isRequired,
  deleteSubnote: PropTypes.func.isRequired
}

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
      const buttonStyle = {
        background: 'url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_delete_black_24px.svg) no-repeat center',
        opacity: '0.75',
        borderRadius: '5px',
        border: 'solid #666666 1px',
        height: '30px',
        width: '30px'
      }

      return (
        <div>
          <button onClick={this.handleOpenModal} style={buttonStyle}></button>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="Delete subnote"
          >
            <h3>Are you sure you want to delete this subnote?</h3>
            <h3>WARNING: Deleting a subnote will also delete all children of that subnote!</h3>
            <button onClick={this.handleSave}>Delete</button>
            <button onClick={this.handleCloseModal}>Cancel</button>
          </ReactModal>
        </div>
      );
    }
}

DeleteModal.propTypes = propTypes;
