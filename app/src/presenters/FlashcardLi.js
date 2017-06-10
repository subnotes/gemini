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
  display: inline-block;
  width: ${props => props.width ? props.width : '100%'};
`;

// Component Metadata
const propTypes = {
  flashcard: PropTypes.object,
};

const defaultProps = {
  flashcard: {},
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
    this.render = this.render.bind(this);

  } // end constructor

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
    return (
      <SimpleCard>
        <CardSectionDiv width='26%'>
          Some Metadata
        </CardSectionDiv>
        <CardSectionDiv width='37%'>
          {this.props.flashcard.qas[0].question}
        </CardSectionDiv>
        <CardSectionDiv width='37%'>
          {this.props.flashcard.qas[0].answer}
        </CardSectionDiv>
        Tags: <TagListContainer tags={this.props.flashcard.tags} readOnly={true}/>
      </SimpleCard>
    );
  } // end render

}

FlashcardLi.propTypes = propTypes;
FlashcardLi.defaultProps = defaultProps;

export default FlashcardLi;
