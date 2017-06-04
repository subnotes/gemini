/**
 * Container Component for Tag List
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import related presenter
import TagList from '../presenters/TagList';    

// import helpers

// Component Metadata
const propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  handleAdd: PropTypes.func,
  handleDelete: PropTypes.func
};

const defaultProps = {
  tags: [],
};

// Main Container Component
class TagListContainer extends Component {

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
      tags: this.props.tags
    };

    // Function Bindings
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */

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
      <TagList
        tags={this.state.tags}
        handleAdd={this.props.handleAdd}
        handleDelete={this.props.handleDelete} />
    );
  } // end render

}

TagListContainer.propTypes = propTypes;
TagListContainer.defaultProps = defaultProps;

export default TagListContainer;
