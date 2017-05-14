// import node packages
import React from 'react';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardInterface from './interfaces/FlashcardInterface';

// Component for Explorer View
var FlashcardExplorer = React.createClass({
  getInitialState: function () {
    return { flashcards: []};
  },

  handleDeleteCard: function(idx) {
    console.log(idx);
    alert("Delete from flashcard manager not yet implemented.");
  },

  componentWillMount: function () {
    var flashcards = FlashcardInterface.getFlashcards(this.props.notebook);
    this.setState({flashcards: flashcards});
  },

  render: function () {
    if (this.state.flashcards.length > 0) {
      return (
        <div>
          <h3>Flashcard Explorer</h3>
          <div>
            <ul>
              {this.state.flashcards.map(card => (
                <li>
                  <FlashcardContainer
                    flashcard={card}
                    behavior="manage"
                    handleDelete={this.handleDeleteCard} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Flashcard Explorer</h3>
          There don't appear to be any flashcards in this notebook yet.
        </div>
      );
    }
  }
});

export default FlashcardExplorer;
