// import node packages
import React from 'react';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardInterface from './interfaces/FlashcardInterface';

// Component for Flashcard Review
class Review extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    /* Implement this
    this.propTypes = {
    };
     */
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
    var flashcards = FlashcardInterface.getFlashcards(this.props.notebook);
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

export default Review;
