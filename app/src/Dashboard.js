// import node packages
import React from 'react';

function Dashboard(props) {
  return (
    <div>
      <h3>Dashboard</h3>
      Site currently only supports one notebook, so nothing to see here yet
      {props.files}
    </div>
  )
}

export default Dashboard;