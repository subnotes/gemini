// import node packages
import React from 'react';
import {Link} from 'react-router-dom';

function Dashboard(props) {
  
  if (typeof props.library.notebooks !== 'undefined') {
    return(
      <div>
        <h3>Library</h3>
        <h4>Your Notebooks</h4>
        <ul>
          {Object.entries(props.library.notebooks).map(item => (
            <li key={item[0]}>
              <h3>{item[1]['fileName']}</h3>
              <Link to={"/notebook/" + item[0]}>view</Link>
              <span> </span>
              <Link to={"/notebook/edit/" + item[0]}>edit</Link>
            </li>
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
