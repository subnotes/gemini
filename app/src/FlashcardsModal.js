import React, { Component } from 'react';
import ReactModal from 'react-modal';

import FlashcardContainer from './containers/FlashcardContainer.js';
import FlashcardInterface from './interfaces/FlashcardInterface.js';

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
          newCardQ: "",
          newCardA: "",
          newCardTags: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
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
        newCardTags: tagsCopy
      });
    }

    handleAddCard({ target }) {
      // Make new Flashcard
      var newCard = {
        qas: [],
        tags: []
      };
      newCard.qas.push({
        question: this.state.newCardQ,
        answer: this.state.newCardA
      });
      newCard.tags = this.state.newCardTags;

      // Add new flashcard to array
      var newCardArray = this.state.flashcards;
      newCardArray.push(newCard);
      this.setState({
        flashcards: newCardArray,
        newCardQ: "",
        newCardA: "",
        newCardTags: []
      });

      // Create new row object
      var newTreeData = this.props.replaceSubnote(this.props.rowInfo, this.state); //replace subnote and update treeData
      this.props.updateTreeDataState(newTreeData); //update state of the SortableTree, causing it to re-render
    }

    handleDeleteCard(idx) {
      console.log("Deleting index: ", idx);
      var newCardArray = this.state.flashcards;
      newCardArray.splice(idx, 1);
      this.setState({flashcards: newCardArray});
    }

    render () {
      var tagArray = [];
      var numTags = 5;
      for (var i = 0; i < numTags; i++) {
        var tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} onChange={this.handleTagChange}/>);
      }

      var flashcardView = null;
      if (typeof this.state.flashcards != 'undefined' && this.state.flashcards.length > 0) {
        flashcardView = (
          <ul>
            {this.state.flashcards.map((card, i) => (
              <li>
                <FlashcardContainer
                  flashcard={FlashcardInterface.convertTreeCard(card, this.props.rowInfo.id, i)}
                  behavior="manage"
                  handleDelete={this.handleDeleteCard}/>
              </li>
            ))}
          </ul>
        );
      } else {
        flashcardView = <div>There don't seem to be any flashcards in this subnote.</div>;
      }

      return (
        <div>
          <button onClick={this.handleOpenModal}>Flashcards</button>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="View Flashcards"
          >
            <div>
              <h3>{this.props.rowInfo.node.title}</h3>
              <span>{this.props.rowInfo.node.subtitle}</span>
            </div>
            {flashcardView}
            <h4>Add New Flashcard</h4>
            <form>
              Question:
              <input type="text" name="newCardQ" value={this.state.newCardQ} onChange={this.handleChange}/>
              <br />
              Answer:
              <input type="text" name="newCardA" value={this.state.newCardA} onChange={this.handleChange}/>
              <br />
              Tags:
              {tagArray}
            </form>
            <button onClick={this.handleAddCard}>Add This Card</button>
            <button onClick={this.handleCloseModal}>Close Flashcards</button>
          </ReactModal>
        </div>
      );
    }
}
