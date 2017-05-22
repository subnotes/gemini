// import node packages
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

function ExampleSubnote(props) {

  if (typeof props.notebookPlusMeta === 'undefined' || typeof props.notebookPlusMeta.notebook === 'undefined') {
    console.log(props)
    return (<h3>Sorry, we couldn't load that notebook</h3>)
  } else if (typeof props.notebookPlusMeta.notebook.subnotes === 'undefined') {
    return (<h3>Notebook does not contain any subnotes</h3>)
  } else if (typeof props.notebookPlusMeta.notebook.subnotes[props.match.params.subnoteid] === 'undefined') {
     return (<h3>Notebook does not contain that subnotes</h3>)  
  } else {
    return (
      <div>
        <div>
          <h3>Notebook: {props.notebookPlusMeta.fileName}</h3>
          <h3>Subnote:</h3>
          <h4>Subtopic: {props.notebookPlusMeta.notebook.subnotes[props.match.params.subnoteid]['subtopic']}</h4>
          <h4>Note: </h4>
          <div>{props.notebookPlusMeta.notebook.subnotes[props.match.params.subnoteid]['note']}</div>
        </div>
      </div>
    )
  }
}

export default ExampleSubnote;
