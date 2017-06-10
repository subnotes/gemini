/**
 * Presenter Component for FlashcardLi
 */

// Import Node Packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import Local Components
import SimpleCard from './SimpleCard';
import TagListContainer from '../containers/TagListContainer';

// Import Helpers

// Local Styled Components
const CardSectionDiv = styled.div`
  display: table-cell;
  width: ${props => props.width ? props.width : '100%'};
  padding: 2px 5px;
`;

// Component Metadata
const propTypes = {
  flashcard: PropTypes.object,
  readOnly: PropTypes.bool,
  handleDelete: PropTypes.func,
};

const defaultProps = {
  flashcard: {},
  readOnly: false,
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
    };

    // Function Bindings
    this.handleDelete = this.handleDelete.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */
  handleDelete (e) {
    e.preventDefault();
    this.props.handleDelete(this.props.flashcard.cardIdx);
  } // end handleDelete

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
    var subtopic = this.props.flashcard.subtopic ? this.props.flashcard.subtopic : 'No subtopic';
    var tags = (this.props.flashcard.tags.length > 0) ? (<TagListContainer tags={this.props.flashcard.tags} readOnly={true}/>) : 'No tags attached';
    var remove = this.props.readOnly ? null : (<button onClick={this.handleDelete}>Delete Card</button>)
    return (
      <SimpleCard>
        <table style={{width: "100%"}}>
          <CardSectionDiv width='26%'>
            <p>Subtopic: {subtopic}</p>
            <p>Contains {this.props.flashcard.qas.length.toString()} variants</p>
            <p>Schedule: Not Selected</p>
            <p>Next Review: N/A</p>
            <p>Tags: {tags}</p>
          </CardSectionDiv>
          <CardSectionDiv width='37%'>
            <h4>Question</h4>
            <br/>
            {this.props.flashcard.qas[0].question}
          </CardSectionDiv>
          <CardSectionDiv width='37%'>
            <h4>Answer</h4>
            <br/>
            {this.props.flashcard.qas[0].answer}
          </CardSectionDiv>
        </table>
        {remove}
      </SimpleCard>
    );
  } // end render

}

FlashcardLi.propTypes = propTypes;
FlashcardLi.defaultProps = defaultProps;

export default FlashcardLi;
