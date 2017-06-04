/**
 * Presenter Component for Tag
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import helpers

// Component Metadata
const propTypes = {
  tag: PropTypes.string.isRequired,
};

const defaultProps = {
  tag: "Example Tag",
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
      <span>
        {this.props.tag}
      </span>
    );
  } // end render

}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
