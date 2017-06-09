// import node packages
import React from 'react';
import styled from 'styled-components'

const LoginContainer = styled.div`
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 90px;
`
const Title = styled.h1`
  font-weight: bold;
  flex: 1;
  align-self: flex-end;
  `
const Red = styled.span`
  color: #e06666;
  `
const Blue = styled.span`
  color: #6fa8dc;
`

function Login(props) {
  return (props.initialized
    ? (
      <LoginContainer>
        <h1><Red>sub</Red><Blue>notes</Blue></h1>
        <h3>Google Account is required</h3>
        <button onClick={props.loginUser}>login</button>
      </LoginContainer>
    )
    : (
      <h3>loading and initializing shtuff from google...</h3>
    ))
}

export default Login;
