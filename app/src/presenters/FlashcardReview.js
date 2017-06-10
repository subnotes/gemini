/**
 * Presenter Component for Flashcard Review
 */

// Import Node Packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import Local Components
import SimpleCard from './SimpleCard';
import { CancelButton, SubnoteButton } from './ModalStyles';

// Import Helpers

// Local Styled Components
const CorrectSpan = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${props => props.correct ? 'Green' : 'Red'};
  vertical-align: center;
`;

// Component Metadata
const propTypes = {
  flashcard: PropTypes.object,
  viewIdx: PropTypes.number,
  answered: PropTypes.bool,
  correct: PropTypes.bool,
  flipCard: PropTypes.func,
  nextCard: PropTypes.func,
  setCorrect: PropTypes.func,
  setIncorrect: PropTypes.func,
};

const defaultProps = {
  flashcard: {},
  viewIdx: 0,
  answered: false,
};

// Main Container Component
class FlashcardLi extends Component {

  /**
   * Other Class Methods
   */

  /**
   * React Functions
   */
  constructor (props) {
    super(props);

    // Member Variables
    this.state = {
      currentView: "answer",
    };

    // Function Bindings
    this.flipCard = this.flipCard.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */
  flipCard () {
    this.setState({ currentView: (this.state.currentView === "answer") ? "question" : "answer" });
  }

  /**
   * Getter Methods
   */

  /**
   * Other Render Methods
   */

  /**
   * Render Function
   */
  render () {
    if (!this.props.answered) {
      return (
        <SimpleCard>
          <div style={{width: "100%", textAlign: "center"}}>
            <h4>Question</h4>
            <p>{this.props.flashcard.qas[this.props.viewIdx].question}</p>
          </div>
          <table style={{margin: 'auto'}}>
            <td><SubnoteButton flashcard onClick={this.props.flipCard}>Flip</SubnoteButton></td>
            <td><SubnoteButton flashcard onClick={this.props.nextCard}>Skip</SubnoteButton></td>
          </table>
        </SimpleCard>
      );
    } else {
      var correct = null;
      if (this.props.correct !== null) {
        correct = <CorrectSpan correct={this.props.correct}/>
      }

      var content = null;
      switch (this.state.currentView) {
        case "answer":
          content = (
            <div style={{width: "100%", textAlign: "center"}}>
              <h4>Answer</h4>
              <p>{this.props.flashcard.qas[this.props.viewIdx].answer}</p>
            </div>
          );
          break;
        case "question":
          content = (
            <div style={{width: "100%", textAlign: "center"}}>
              <h4>Question</h4>
              <p>{this.props.flashcard.qas[this.props.viewIdx].question}</p>
            </div>
          );
          break;
        default:
          content = (
            <div style={{width: "100%", textAlign: "center"}}>
              <p>No card here...</p>
            </div>
          );
      }

      return (
        <SimpleCard>
          {content}
          <table style={{margin: 'auto'}}>
            <tr>
              <td>
                <h5>Did you get it?</h5>
                <SubnoteButton flashcard onClick={this.props.setCorrect}>Yes</SubnoteButton>
                <CancelButton flashcard onClick={this.props.setIncorrect}>No</CancelButton>
                {correct}
              </td>
            </tr>
            <tr>
              <td>
                <SubnoteButton flashcard onClick={this.flipCard}>Flip</SubnoteButton>
                <SubnoteButton flashcard onClick={this.props.nextCard} style={{marginLeft: '5px'}}>Next</SubnoteButton>
              </td>
            </tr>
          </table>
        </SimpleCard>
      );
    }
  } // end render

}

FlashcardLi.propTypes = propTypes;
FlashcardLi.defaultProps = defaultProps;

export default FlashcardLi;
