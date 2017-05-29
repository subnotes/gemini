/**
 * Container Component for Tag List
 */

// import node packages
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import related presenter
import TagList from '../presenters/TagList';    

// import helpers

// Component Metadata
const propTypes = {
};

const defaultProps = {
};

// Main Container Component
class TagListContainer extends Component {

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
    return <TagList />;
  } // end render

}

TagListContainer.propTypes = propTypes;
TagListContainer.defaultProps = defaultProps;

export default TagListContainer;
