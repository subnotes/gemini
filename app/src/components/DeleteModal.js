import React, { Component } from 'react';
import ReactModal from 'react-modal';

//DeleteBox adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
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
      var newTree = this.props.deleteSubnote(this.props.rowInfo); //delete subnote and update treeData
      this.props.updateTreeDataState(newTree); //update state of the SortableTree, causing it to re-render
      this.handleCloseModal(); //close the modal window
    }

    render () {
      return (
        <div>
          <button onClick={this.handleOpenModal}>Delete</button>
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
