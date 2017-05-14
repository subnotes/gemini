import React, { Component } from 'react';
import ReactModal from 'react-modal';

//EditBox adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
export default class FlashcardsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
          showModal: false,
          subtopic: this.props.rowInfo.node.title,
          note: this.props.rowInfo.node.subtitle,
          tags: this.props.rowInfo.node.tags,
          flashcards: this.props.rowInfo.node.flashcards,
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
          tags: nextProps.rowInfo.node.tags,
          flashcards: nextProps.rowInfo.node.flashcards,
        });
      }
    }

    handleOpenModal () {
      this.setState({ showModal: true });
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleChange({ target }) {
      this.setState({
        [target.name]: target.value
      });
      //console.log(this.state);
    }

    handleTagChange({ target }) {
      var tagNum = parseInt(target.name.substr(-1), 10); //get last character of tag name, equal to the index of the tags array (WILL BE ISSUES IF WE GET INTO DOUBLE DIGIT TAGS ON A NODE)
      var tagsCopy = this.props.rowInfo.node.tags.slice();
      tagsCopy[tagNum] = target.value;
      this.setState({
        tags: tagsCopy
      });
    }

    handleSave({ target }) {
      var newTreeData = this.props.replaceSubnote(this.props.rowInfo, this.state); //replace subnote and update treeData
      this.props.updateTreeDataState(newTreeData); //update state of the SortableTree, causing it to re-render
      this.handleCloseModal(); //close the modal window
    }

    render () {
      return (
        <div>
          <button onClick={this.handleOpenModal}>Flashcards</button>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="View Flashcards"
          >
            <h3>{this.props.rowInfo.node.title}</h3>
            <span>{this.props.rowInfo.node.subtitle}</span>
            <div>
              This is where the flashcards will go.
            </div>
            <button onClick={this.handleCloseModal}>Close Flashcards</button>
          </ReactModal>
        </div>
      );
    }
}
