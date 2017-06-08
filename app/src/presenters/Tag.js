/**
 * Presenter Component for Tag
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import Local Packages
import CloseIcon from './CloseIcon';

// import helpers

// Styled components
const TagWrapper = styled.div`
  position: relative;
  display: inline-table;
  border-collapse: separate;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2px 0px 2px 5px;
  background: #eee;
  font-size: 12px;
`;

// Component Metadata
const propTypes = {
  tag: PropTypes.string.isRequired,
  index: PropTypes.number,
  handleDelete: PropTypes.func,
};

const defaultProps = {
  tag: "Example Tag",
  handleDelete: function (e) {
    console.log(e.target.index);
  },
};

// Main Container Component
class Tag extends Component {

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
      index: this.props.index,
    };

    // Function Bindings
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */
  handleDeleteClick (e) {
    this.props.handleDelete(this.state.index);
  } // end handleDeleteClick

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
      <TagWrapper>
        <td>{this.props.tag}</td>
        <CloseIcon onClick={this.handleDeleteClick}/>
      </TagWrapper>
    );
  } // end render

}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
