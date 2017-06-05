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
      input: "",
    };

    // Function Bindings
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */
  handleInputChange (e) {
    this.setState({ input: e.target.value });
  } // end handleInputChange

  handleAdd (e) {
    var newTag = this.state.input;
    this.setState({ input: '' });
    this.props.handleAdd(newTag);
  } // end handleAdd

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
        tags={this.props.tags}
        input={this.state.input}
        handleInputChange={this.handleInputChange}
        handleAdd={this.handleAdd}
        handleDelete={this.props.handleDelete}
      />
    );
  } // end render

}

TagListContainer.propTypes = propTypes;
TagListContainer.defaultProps = defaultProps;

export default TagListContainer;
