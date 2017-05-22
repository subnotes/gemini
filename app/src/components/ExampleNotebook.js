// import node packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

function ExampleNotebook(props) {

  if (typeof props.notebookPlusMeta === 'undefined' || typeof props.notebookPlusMeta.notebook === 'undefined') {
    return (<h3>Sorry, we couldn't load that notebook</h3>)
  } else if (typeof props.notebookPlusMeta.notebook.subnotes === 'undefined') {
    return (<h3>Notebook does not contain any subnotes</h3>)
  } else {
    return (
      <div>
        <div>
          <h3>Notebook: {props.notebookPlusMeta.fileName}</h3>
        </div>
        <ul>
          {Object.entries(props.notebookPlusMeta.notebook.subnotes).map(item => (
            <li key={item[0]}>
              <Link to={"/notebook/" + props.match.params.notebookid + "/subnote/" + item[0]}><h3>Subtopic: {item[1]['subtopic']}</h3></Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ExampleNotebook;
