// import node packages
import React from 'react';

function Flashcard(props) {
  switch(props.behavior) {
    case "manage":
      return(
        <ul>
          {props.flashcard.qaPairs.map(
              qaPair => <li> Question: <span>{qaPair.question}</span><br />
                             Answer: <span>{qaPair.answer}</span> </li>
              )}
        </ul>
      );
    case "review":
      return;
    default:
      return (
        <span>
          Something went wrong displaying this flashcard.
        </span>
      );
  }
}

export default Flashcard;
