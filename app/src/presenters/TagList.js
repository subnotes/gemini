/**
 * Presenter Component for TagList
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Import Local Components
import Tag from './Tag';

// import helpers

// Component Metadata
const propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

const defaultProps = {
  tags: [],
};

// Main Container Component
class TagList extends Component {

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
      tags: this.props.tags,
    };

    // Function Bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  /**
   * Click and Event Handlers
   */
  handleChange (e) {
    this.setState({ input: e.target.value });
  } // end handleChange

  handleAddClick (e) {
    var newTag = this.state.input;
    this.setState({ input: '' });
    this.props.handleAdd(newTag);
  } // end handleClick

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
      <div>
        <h3> TagList </h3>
        {this.state.tags.map(tag => <Tag tag={tag} />)}
        <input
          value={this.state.input}
          onChange={this.handleChange} />
        <button onClick={this.handleAddClick}>Add</button>
      </div>
    );
  } // end render

}

TagList.propTypes = propTypes;
TagList.defaultProps = defaultProps;

export default TagList;
