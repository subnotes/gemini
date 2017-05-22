// import node packages
import React from 'react';
import {Link} from 'react-router-dom';

function Library(props) {
  
  if (typeof props.library !== 'undefined') {
    return(
      <div>
        <h3>Your Notebooks</h3>
        <ul>
          {console.log(Object.keys(props.library).length)}
          {Object.entries(props.library).map(item => (
            <li key={item[0]}>
              {
                console.log(item[1])
              }
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
    return (<div>No notebooks in your Library</div>)
  }
}

export default Library;
