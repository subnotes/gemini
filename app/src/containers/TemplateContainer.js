// import node packages
import React from 'react';

// import related presenter
import Template from '../presenters/Template';    

// Main Container Component
class TemplateContainer extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    this.propTypes = {
    };
    this.state = {
      template: "template",
    };

    // Function Bindings
    this.templateFunction = this.templateFunction.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);

  } // end constructor

  templateFunction() {
    return;
  } // end tempalteFunction

  componentWillMount () {
    return;
  } // end componentWillMount

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        template: nextProps.template,
      });
    }
  } // end componentWillReceiveProps

  render () {
    return <Template />;
  } // end render

}

export default TemplateContainer;
