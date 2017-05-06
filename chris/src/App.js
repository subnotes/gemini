import React, { Component } from 'react';
import './App.css';
import testBook from './data/data.json';
var notebook = testBook.notebook;

class App extends Component {
  render() {
    return (
        <div>
          <h1>{notebook.title}</h1>
          <h2>{notebook.topic}</h2>
        </div>
    );
  }
}

export default App;
