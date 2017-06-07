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
  input: PropTypes.string,
  handleKeyDown: PropTypes.func,
  handleDelete: PropTypes.func,
  handleInputChange: PropTypes.func,
  parentId: PropTypes.string,
};

const defaultProps = {
  tags: [],
  input: '',
  handleAdd: function (tag) {
    console.log(tag);
  },
  handleDelete: function (e) {
    console.log(e.target.index);
  },
  handleInputChange: function (e) {
    console.log(e);
  },
  parentId: '',
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
    var tagElements = null;
    if (this.props.tags.length > 0) {
      tagElements = this.props.tags.map(
                      (tag, i) => <Tag
                                    tag={tag}
                                    index={i}
                                    handleDelete={this.props.handleDelete}
                                    key={this.props.parentId + tag + i.toString()}
                                  />)
    }
    return (
      <div>
        {tagElements}
        <input
          value={this.props.input}
          placeholder="Add a new tag..."
          onChange={this.props.handleInputChange}
          onKeyDown={this.props.handleKeyDown} />
      </div>
    );
  } // end render

}

TagList.propTypes = propTypes;
TagList.defaultProps = defaultProps;

export default TagList;
