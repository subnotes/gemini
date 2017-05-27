import React from 'react';
import {Link} from 'react-router-dom';

function Dashboard(props) {

  if (typeof props.library !== 'undefined') {
    return(
      <div>
        <h3>Dashboard</h3>
        <h4>Your Notebooks</h4>
        <ul>
          {Object.entries(props.library).map(item => (
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

export default Dashboard;
