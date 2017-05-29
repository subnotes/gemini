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
  tagList: PropTypes.array,
};

const defaultProps = {
  tagList: [],
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
    this.getChildContext = this.getChildContext.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
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
    return;
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
        <Tag tag="example" />
      </div>
    );
  } // end render

}

TagList.propTypes = propTypes;
TagList.defaultProps = defaultProps;

export default TagList;
