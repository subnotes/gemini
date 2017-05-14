// import node packages
import React from 'react';

// import related presenter
import Flashcard from '../presenters/Flashcard';    

// Main Container Component
var FlashcardContainer = React.createClass({
  getInitialState: function () {
    return {
      flashcard: false,
      behavior: "manage",
      viewIdx: 0
    };
  },

  componentWillMount: function() {
    // Grab the card data and behavior from props
    this.setState({
      flashcard: this.props.flashcard,
      behavior: this.props.behavior
    });

    if (this.state.behavior == "review" && this.state.flashcard.qaPairs.length > 1) {
      // Choose random index of question to view here
    }
  },

  render: function () {
    return <Flashcard
      flashcard={this.state.flashcard}
      behavior={this.state.behavior}
      viewIdx={this.state.viewIdx}
      nextCard={this.props.nextCard} />;
  }
});

export default FlashcardContainer;