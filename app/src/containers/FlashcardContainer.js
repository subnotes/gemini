/**
 * Container Component for a Flashcard
 */

// import node packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Local Components
import FlashcardLi from '../presenters/FlashcardLi';
import FlashcardReview from '../presenters/FlashcardReview';

// Import Helpers
import { getRandomInt } from '../helpers/OtherHelpers';

// Component Metadata
const propTypes = {
  flashcard: PropTypes.object.isRequired,
  viewType: PropTypes.string,
  nextCard: PropTypes.func,
  handleDelete: PropTypes.func,
  readOnly: PropTypes.bool,
};

const defaultProps = {
  flashcard: {},
  viewType: "li",
  readOnly: false,
};

// Main Container Component
class FlashcardContainer extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    this.state = {
      flashcard: this.props.flashcard,
      viewIdx: 0,
      answered: false,
      correct: null,
    };

    // Function Bindings
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.setCorrect = this.setCorrect.bind(this);
    this.setIncorrect = this.setIncorrect.bind(this);
    this.render = this.render.bind(this);
  } // end constructor

  // Make sure we are displaying the correct flashcard
  componentWillReceiveProps (nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        flashcard: nextProps.flashcard,
        viewIdx: 0,
        answered: false,
        correct: null,
      });
    }
  } // end componentWillReceiveProps

  flipCard () {
    this.setState({ answered: true });
  } // end flipCard

  nextCard () {
    // TODO:
    // If card isn't answered, call skip prop
    // Otherwise, call next with appropriate arguments
    return;
  }

  setCorrect () {
    this.setState({ correct: true });
  } // end setCorrect

  setIncorrect () {
    this.setState({ correct: false });
  } // end setIncorrect

  render () {
    switch (this.props.viewType) {
      case "li":
        return (
          <FlashcardLi
            flashcard={this.state.flashcard}
            readOnly={this.props.readOnly}
            handleDelete={this.props.handleDelete}
          />
        );
      case "review":
        return (
          <FlashcardReview
            flashcard={this.state.flashcard}
            viewIdx={this.state.viewIdx}
            answered={this.state.answered}
            correct={this.state.correct}
            flipCard={this.flipCard}
            nextCard={this.props.nextCard}
            setCorrect={this.setCorrect}
            setIncorrect={this.setIncorrect}
          />
        );
      default:
        return (
          <div>
            No flashcard here
          </div>
        );
    }
  } // end render

}

FlashcardContainer.propTypes = propTypes;
FlashcardContainer.defaultProps = defaultProps;

export default FlashcardContainer;
