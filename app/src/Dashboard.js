// import node packages
import React from 'react';
import {Link} from 'react-router-dom';

function Dashboard(props) {
  
  if (typeof props.notebook.subnotes !== 'undefined') {
    return(
      <div>
        <h3>Dashboard</h3>
        Site currently only supports one (default) notebook called "Gemini Notebook", which is stored on your Google drive.
        In the future your notebooks would be listed here, but for now select "Notebook Explorer" to view and edit your "Gemini Notebook"
      </div>
    )
  }
  else {
    return (<div>no subnotes in this notebook</div>)
  }
}

export default Dashboard;
