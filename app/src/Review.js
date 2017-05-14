// import node packages
import React from 'react';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardInterface from './interfaces/FlashcardInterface';

// Component for Flashcard Review
var Review = React.createClass({
  getInitialState: function () {
    return { flashcards: [] };
  },

  nextCard: function () {
    this.state.flashcards.push(this.state.flashcards.shift());
  },

  componentWillMount: function() {
    var flashcards = FlashcardInterface.getFlashcards(this.props.notebook);
    this.setState( { flashcards: flashcards } );
  },

  render: function () {
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
  }
});

function Review(props) {
  return (
    <div>
      <h3>Review</h3>
    </div>
  )
}

export default Review;
