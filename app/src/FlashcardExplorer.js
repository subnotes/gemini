// import node packages
import React, { Component } from 'react';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardInterface from './interfaces/FlashcardInterface';

// Component for Explorer View
class FlashcardExplorer extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    /* Need to get this implemented
    this.propTypes = {
    };
    */
    this.state = {
      flashcards: [],
    };

    // Function Bindings
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.render = this.render.bind(this);
  } // end constructor

  // Class Functions
  handleDeleteCard (idx) {
    alert("Delete from flashcard manager not yet implemented.");
  } // end handleDeleteCard

  componentWillMount () {
    var flashcards = FlashcardInterface.getAllCards(this.props.library);
    this.setState({flashcards: flashcards});
  } // end componentWillMount

  render () {
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
  } // end render
}

export default FlashcardExplorer;
