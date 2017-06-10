/**
 * Page Component for Flashcard Manager
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
};

// Component Class for Explorer View
class FlashcardExplorer extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    this.state = {
      flashcards: FlashcardHelper.getAllCards(this.props.library),
    };

    // Function Bindings
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);
  } // end constructor

  // Class Functions
  handleDeleteCard (idx) {
    alert("Delete from flashcard manager not yet implemented.");
  } // end handleDeleteCard

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      var newCards = FlashcardHelper.getAllCards(nextProps.library);
      this.setState({ flashcards: newCards });
    }
  } // end componentWillReceiveProps

  render () {
    if (this.state.flashcards.length > 0) {
      return (
        <PageDiv width='60%'>
          {this.state.flashcards.map(card => (
            <FlashcardContainer
              flashcard={card}
              viewType="li"
              readOnly={true} />
          ))}
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

FlashcardExplorer.propTypes = propTypes;
FlashcardExplorer.defaultProps = defaultProps;

export default FlashcardExplorer;
