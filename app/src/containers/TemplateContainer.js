/**
 * Container Component for Template
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import related presenter
import Template from '../presenters/Template';    

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
class TemplateContainer extends Component {

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
    return <Template />;
  } // end render

}

TemplateContainer.propTypes = propTypes;
TemplateContainer.defaultProps = defaultProps;

export default TemplateContainer;
