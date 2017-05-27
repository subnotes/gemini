/**
 * Page Component for Flashcard Manager
 */

// import node packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardHelper from './helpers/FlashcardHelper';

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
    var flashcards = FlashcardHelper.getAllCards(this.props.library);
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

FlashcardExplorer.propTypes = propTypes;
FlashcardExplorer.defaultProps = defaultProps;

export default FlashcardExplorer;
