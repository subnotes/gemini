// import node packages
import React from 'react';

function Template(props) {
  return (
    <div>
      <h3>Template</h3>
    </div>
  );
}

class Template extends Component {

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

  templateFunction () {
    return;
  } // end templateFunction

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
    return (
      <div>
        <h3> Template </h3>
      </div>
    );
  } // end render

}

export default Template;
