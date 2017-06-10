/**
 * Presenter Component for Template
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import helpers

// Component Metadata
const propTypes = {
  template: PropTypes.string.isRequired,
  prop2: PropTypes.object,
  prop3: PropTypes.func,
};

const defaultProps = {
  template: "Hello World",
  prop2: {},
  prop3: function() {return;},
};

// Main Container Component
class Template extends Component {

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
      template: "template",
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
      <div>
        <h3> Template </h3>
      </div>
    );
  } // end render

}

Template.propTypes = propTypes;
Template.defaultProps = defaultProps;

export default Template;
