// import node packages
import React, { Component } from 'react';

// import related presenter
import Flashcard from '../presenters/Flashcard';

// Main Container Component
class FlashcardContainer extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    /* Need to implement this
    this.propTypes = {
    };
     */
    this.state = {
      flashcard: false,
      behavior: "manage",
      viewIdx: 0,
    };

    // Function Bindings
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);
  } // end constructor

  componentWillMount () {
    // Grab the card data and behavior from props
    this.setState({
      flashcard: this.props.flashcard,
      behavior: this.props.behavior
    });

    if (this.state.behavior === "review" && this.state.flashcard.qas.length > 1) {
      // Choose random index of question to view here
    }
  } // end componentWillMount

  // Make sure we are displaying the correct flashcard
  componentWillReceiveProps (nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        flashcard: nextProps.flashcard,
        behavior: nextProps.behavior
      });
    }
  } // end componentWillReceiveProps

  render () {
    return <Flashcard
      flashcard={this.state.flashcard}
      behavior={this.state.behavior}
      viewIdx={this.state.viewIdx}
      nextCard={this.props.nextCard}
      handleDelete={this.props.handleDelete}/>;
  } // end render

}

export default FlashcardContainer;
