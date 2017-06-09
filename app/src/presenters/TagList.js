/**
 * Presenter Component for TagList
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import Local Components
import Tag from './Tag';

// import helpers

// Local Styled Components
const TagListDiv = styled.div`
  max-width: 650px;
  margin: 2px 5px;
`;

const TagInput = styled.input`
  margin:inherit;
`;

// Component Metadata
const propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  input: PropTypes.string,
  handleKeyDown: PropTypes.func,
  handleDelete: PropTypes.func,
  handleInputChange: PropTypes.func,
  parentId: PropTypes.string,
  readOnly: PropTypes.bool,
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
  readOnly: false,
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
                                    readOnly={this.props.readOnly}
                                  />)
    }

    if (this.props.readOnly) {
      return (
        <TagListDiv>
          {tagElements}
        </TagListDiv>
      );
    } else {
      return (
        <TagListDiv>
          {tagElements}
          <TagInput
            value={this.props.input}
            placeholder="Add a new tag..."
            onChange={this.props.handleInputChange}
            onKeyDown={this.props.handleKeyDown} />
        </TagListDiv>
      );
    }
  } // end render

}

TagList.propTypes = propTypes;
TagList.defaultProps = defaultProps;

export default TagList;
