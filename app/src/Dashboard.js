import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (typeof this.props.library !== 'undefined') {
      return(
        <div>
          <h3>Dashboard</h3>
          <h4>Your Notebooks</h4>
          <ul>
            {Object.entries(this.props.library).map(item => (
              <li key={item[0]}><Link to={"/notebook/" + item[0]}>{item[1]['fileName']}</Link></li>
            ))}
          </ul>
        </div>
      )
    }
    else {
      return (<div>no subnotes in this notebook</div>)
    }
  }

}

export default Dashboard;
