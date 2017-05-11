// import node packages
import React from 'react';

function Flashcard(props) {
  return (
    <li>
      Question: <span>{this.props.question}</span><br />
      Answer: <span>{this.props.answer}</span>
    </li>
  );
}

export default Flashcard;
