// import node packages
import React from 'react';
import {Link} from 'react-router-dom';

function Dashboard(props) {
  return (
    <div>
      <h3>Dashboard</h3>
      Site currently only supports one (default) notebook called "Gemini Notebook", so nothing to see here... yet.
      <h4>subnotes in notbook in no particular order</h4>
      <ul>
        {Object.entries(props.notebook.subnotes).map(item => (
          <li key={item[0]}><Link to={"/subnote/" + item[0]}>{item[1]['subtopic']}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard;
