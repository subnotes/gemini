/**
 * Page Component for Flashcard Review
 */

// import node packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardInterface from './interfaces/FlashcardInterface';

// Component Metadata
const propTypes = {
  library: PropTypes.func.isRequired,
};

const defaultProps = {
  library: {},
}

// Component for Flashcard Review
class Review extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    this.state = {
      flashcards: [],
    };

    // Function Bindings
    this.nextCard = this.nextCard.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  nextCard () {
    var newCardArray = this.state.flashcards;
    newCardArray.push(newCardArray.shift());
    this.setState({flashcards: newCardArray});
  } // end nextCard

  componentWillMount () {
    var flashcards = FlashcardInterface.getAllCards(this.props.library);
    this.setState( { flashcards: flashcards } );
  } // end componentWillMount

  render () {
    if (this.state.flashcards.length > 0) {
      return (
        <div>
          <h3>Flashcard Review</h3>
          <div>
            <FlashcardContainer
              flashcard={this.state.flashcards[0]}
              behavior="review"
              nextCard={this.nextCard} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Flashcard Review</h3>
          There don't appear to be any flashcards in this notebook yet.
        </div>
      );
    }
  } // end render

}

Review.propTypes = propTypes;
Review.defaultProps = defaultProps;

export default Review;
