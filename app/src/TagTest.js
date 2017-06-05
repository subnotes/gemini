/**
 * Page Component for Tag Test
 */

// Import Node Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Local Components
import TagListContainer from './containers/TagListContainer';

// Import Helpers

// Component Metadata
const propTypes = {
  updateNotebook: PropTypes.func.isRequired,
};

const defaultProps = {
};

// Component Class for Template Page
class TagTest extends Component {

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
      tags: ["tag1", "tag2", "tag3", "tag4"],
    };

    // Function Bindings
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */
  handleAddTag (s) {
    var newTags = this.state.tags;
    newTags.push(s);
    this.setState({tags: newTags});
  } // end handleAddTag

  handleDeleteTag (i) {
    console.log(i);
    var newTags = this.state.tags;
    newTags.splice(i, 1);
    this.setState({tags: newTags});
  } // end handleDeleteTag

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
      <TagListContainer
        tags={this.state.tags}
        handleAdd={this.handleAddTag}
        handleDelete={this.handleDeleteTag} />
    );
  } // end render

}

TagTest.propTypes = propTypes;
TagTest.defaultProps = defaultProps;

export default TagTest;
