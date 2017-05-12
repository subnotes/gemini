// import node packages
import React from 'react';

function Flashcard(props) {
  return (
    <li>
      Question: <span>{props.question}</span><br />
      Answer: <span>{props.answer}</span>
    </li>
  );
}

export default Flashcard;
