/**
 * Container Component for Template
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
  templateMethod () {
    return;
  } // end templateMethod

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
    this.templateMethod = this.templateMethod.bind(this);
    this.getChildContext = this.getChildContext.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.templateHandler = this.templateHandler.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  getChildContext () {
    return;
  } // end getChildContext

  componentWillMount () {
    return;
  } // end componentWillMount

  componentDidMount () {
    return;
  } // end componentDidMount

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        template: nextProps.template,
      });
    }
  } // end componentWillReceiveProps

  shouldComponentUpdate () {
    return;
  } // end shouldComponentUpdate

  componentWillUpdate () {
    return;
  } // end componentWillUpdate

  componentDidUpdate () {
    return;
  } // end componentDidUpdate

  componentWillUnmount () {
    return;
  } // end componentWillUnmount

  /**
   * Click and Event Handlers
   */
  templateHandler () {
    return;
  } // end templateHandler

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
