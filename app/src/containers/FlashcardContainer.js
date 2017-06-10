/**
 * Container Component for a Flashcard
 */

// import node packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Local Components
import Flashcard from '../presenters/Flashcard';
import FlashcardLi from '../presenters/FlashcardLi';

// Component Metadata
const propTypes = {
  flashcard: PropTypes.object.isRequired,
  viewType: PropTypes.string,
  nextCard: PropTypes.func,
  handleDeleteCard: PropTypes.func,
};

const defaultProps = {
  flashcard: {},
  behavior: "li",
};

// Main Container Component
class FlashcardContainer extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    this.state = {
      flashcard: this.props.flashcard,
      viewIdx: 0,
    };

    // Function Bindings
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);
  } // end constructor

  // Make sure we are displaying the correct flashcard
  componentWillReceiveProps (nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        flashcard: nextProps.flashcard,
      });
    }
  } // end componentWillReceiveProps

  render () {
    switch (this.props.viewType) {
      case "li":
        return (
          <FlashcardLi
            flashcard={this.state.flashcard}
          />
        );
      default:
        return <Flashcard
          flashcard={this.state.flashcard}
          behavior={this.state.viewType}
          viewIdx={this.state.viewIdx}
          nextCard={this.props.nextCard}
          handleDelete={this.props.handleDelete}/>;
    }
  } // end render

}

FlashcardContainer.propTypes = propTypes;
FlashcardContainer.defaultProps = defaultProps;

export default FlashcardContainer;
