/**
 * Modal Component (Read-Only) for Flashcards within Notebook Explorer
 */

// import node packages
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

// import local components
import FlashcardContainer from './containers/FlashcardContainer.js';
import FlashcardHelper from './helpers/FlashcardHelper.js';
import { StyledModalDiv, StyledModalP, StyledModalLaunchButton, StyledFlashcardDiv, CancelButton, modalStyle } from './presenters/ModalStyles'
import TagListContainer from './containers/TagListContainer.js';

// Component Metadata
const propTypes = {
  rowInfo: PropTypes.object.isRequired
};

const defaultProps = {
  rowInfo: {}
};

//FlashcardsModal adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
// Component Class for Flashcard Modal View
class FlashcardsModalReadOnly extends Component {

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

  render () {
    var flashcardView = null;
    if (typeof this.state.flashcards !== 'undefined' && this.state.flashcards.length > 0) {
      flashcardView = (
        <ul>
          {this.state.flashcards.map((card, i) => (
            <li key={i}>
              <FlashcardContainer
                flashcard={FlashcardHelper.convertTreeCard(card, this.props.rowInfo.id, i)}
                behavior="review"
              />
            </li>
          ))}
        </ul>
      );
    } else {
      flashcardView = <div>There do not seem to be any flashcards in this subnote.</div>;
    }

    return (
      <div>
        <StyledModalLaunchButton flashcards onClick={this.handleOpenModal}></StyledModalLaunchButton>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="View Flashcards"
          style={modalStyle}
        >
          <StyledFlashcardDiv>
            <StyledModalP subtopic>Subtopic:</StyledModalP>
            <StyledModalP>{this.props.rowInfo.node.title}</StyledModalP>
            <StyledModalP note>Note:</StyledModalP>
            <StyledModalP>{this.props.rowInfo.node.subtitle}</StyledModalP>
            <StyledModalP>Flashcards:</StyledModalP>
            {flashcardView}
          </StyledFlashcardDiv>

          <StyledModalDiv>
            <StyledModalP> Tags: </StyledModalP>
            <TagListContainer
              tags={this.state.tags}
             />
          </StyledModalDiv>>
          <CancelButton onClick={this.handleCloseModal}>Close Flashcards</CancelButton>
        </ReactModal>
      </div>
    );
  } // end render
}

FlashcardsModalReadOnly.propTypes = propTypes;
FlashcardsModalReadOnly.defaultProps = defaultProps;

export default FlashcardsModalReadOnly;
