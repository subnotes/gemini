/**
 * Page Component for Flashcard Review
 */

// import node packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardHelper from './helpers/FlashcardHelper';
import PageDiv from './presenters/PageDiv';

// Component Metadata
const propTypes = {
  library: PropTypes.object.isRequired,
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
      flashcards: FlashcardHelper.getAllCards(this.props.library),
    };

    // Function Bindings
    this.nextCard = this.nextCard.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  nextCard () {
    var newCardArray = this.state.flashcards.slice();
    newCardArray.push(newCardArray.shift());
    this.setState({flashcards: newCardArray});
  } // end nextCard

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      var newCards = FlashcardHelper.getAllCards(nextProps.library);
      this.setState({ flashcards: newCards });
    }
  } // end componentWillReceiveProps

  render () {
    if (this.state.flashcards.length > 0) {
      return (
        <PageDiv width='40%'>
          <FlashcardContainer
            flashcard={this.state.flashcards[0]}
            viewType="review"
            nextCard={this.nextCard} />
        </PageDiv>
      );
    } else {
      return (
        <PageDiv>
          There don't appear to be any flashcards in this notebook yet.
        </PageDiv>
      );
    }
  } // end render

}

Review.propTypes = propTypes;
Review.defaultProps = defaultProps;

export default Review;
