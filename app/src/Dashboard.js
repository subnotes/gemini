// import node packages
import React from 'react';

function Dashboard(props) {
  return (
    <div>
      <h3>Dashboard</h3>
      Site currently only supports one (default) notebook called "Gemini Notebook", so nothing to see here... yet.
      {props.files}
    </div>
  )
}

export default Dashboard;
