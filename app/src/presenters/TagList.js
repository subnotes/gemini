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
  handleAdd: PropTypes.func,
  handleDelete: PropTypes.func,
  handleInputChange: PropTypes.func,
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
  }
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
    return (
      <div>
        <h3> TagList </h3>
        {this.props.tags.map((tag, i) => <Tag
                                          tag={tag}
                                          index={i}
                                          handleDelete={this.props.handleDelete}
                                        />
                            )
        }
        <input
          value={this.props.input}
          onChange={this.props.handleInputChange} />
        <button onClick={this.props.handleAdd}>Add</button>
      </div>
    );
  } // end render

}

TagList.propTypes = propTypes;
TagList.defaultProps = defaultProps;

export default TagList;
