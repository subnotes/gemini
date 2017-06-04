/**
 * Page Component for Template Page
 */

// Import Node Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Local Components
import TemplateContainer from './containers/TemplateContainer';

// Import Helpers

// Component Metadata
const propTypes = {
  template: PropTypes.string.isRequired,
};

const defaultProps = {
  template: "Hello World",
};

// Component Class for Template Page
class TemplatePage extends Component {

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

TemplatePage.propTypes = propTypes;
TemplatePage.defaultProps = defaultProps;

export default TemplatePage;
