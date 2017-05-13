// import node packages
import React from 'react';

function Login(props) {
  return (props.initialized
    ? (
      <div>
        <h3>Google Account is required</h3>
        <button onClick={props.loginUser}>login</button>
      </div>
    )
    : (
      <h3>loading and initializing shtuff from google...</h3>
    ))
}

export default Login;
