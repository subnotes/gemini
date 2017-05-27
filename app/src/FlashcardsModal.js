/**
 * Modal Component for Flashcards within Notebook Explorer
 */

// import node packages
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

// import local components
import FlashcardContainer from './containers/FlashcardContainer.js';
import FlashcardHelper from './helpers/FlashcardHelper.js';

// Component Metadata
const propTypes = {
  rowInfo: PropTypes.object.isRequired,
  replaceSubnote: PropTypes.func.isRequired,
};

const defaultProps = {
  rowInfo: {},
  replaceSubnote: null,
};

//FlashcardsModal adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
// Component Class for Flashcard Modal View
class FlashcardsModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      subtopic: this.props.rowInfo.node.title,
      note: this.props.rowInfo.node.subtitle,
      tags: this.props.rowInfo.node.tags || [],
      flashcards: this.props.rowInfo.node.flashcards || [],
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
        tags: nextProps.rowInfo.node.tags || [],
        flashcards: nextProps.rowInfo.node.flashcards || [],
      });
    }
  } // end componentWillReceiveProps

  handleOpenModal () {
    this.setState({ showModal: true });
  } // end HandleOpenModal

  handleCloseModal () {
    this.setState({ showModal: false });
  } // end handleCloseModal

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
    //console.log(this.state);
  } // end handleChange

  handleTagChange({ target }) {
    var tagNum = parseInt(target.name.substr(3), 10); //get index of tag array (gets rid of "tag" from target name)
    var tagsCopy = this.props.rowInfo.node.tags.slice();
    tagsCopy[tagNum] = target.value;
    this.setState({
      newCardTags: tagsCopy
    });
  } // end handleTagChange

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

    // Replace/edit subnote
    this.props.replaceSubnote(this.props.rowInfo, this.state);
  } // end handleAddCard

  handleDeleteCard(idx) {
    console.log("Deleting index: ", idx);
    var newCardArray = this.state.flashcards;
    newCardArray.splice(idx, 1);
    //set new state, then update notebook (which causes save to google drive)
    this.setState({flashcards: newCardArray}, this.props.replaceSubnote(this.props.rowInfo, this.state));
  } // end handleDeleteCard

  render () {
    var tagArray = [];
    var numTags = 5;
    for (var i = 0; i < numTags; i++) {
      var tagLabel = "tag" + i;
      tagArray.push(<input type="text" name={tagLabel} key={i} onChange={this.handleTagChange}/>);
    }

    var flashcardView = null;
    if (typeof this.state.flashcards !== 'undefined' && this.state.flashcards.length > 0) {
      flashcardView = (
        <ul>
          {this.state.flashcards.map((card, i) => (
            <li key={i}>
              <FlashcardContainer
                flashcard={FlashcardHelper.convertTreeCard(card, this.props.rowInfo.id, i)}
                behavior="manage"
                handleDelete={this.handleDeleteCard}/>
            </li>
          ))}
        </ul>
      );
    } else {
      flashcardView = <div>There do not seem to be any flashcards in this subnote.</div>;
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
            <textarea rows="10" cols="75" name="newCardQ" value={this.state.newCardQ} onChange={this.handleChange}/>
            <br />
            Answer:
            <textarea rows="10" cols="75" name="newCardA" value={this.state.newCardA} onChange={this.handleChange}/>
            <br />
            Tags:
            {tagArray}
          </form>
          <button onClick={this.handleAddCard}>Add This Card</button>
          <button onClick={this.handleCloseModal}>Close Flashcards</button>
        </ReactModal>
      </div>
    );
  } // end render
}

FlashcardsModal.propTypes = propTypes;
FlashcardsModal.defaultProps = defaultProps;

export default FlashcardsModal;
