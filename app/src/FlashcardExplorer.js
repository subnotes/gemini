// import node packages
import React from 'react';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';

// Local flashcard array for testing

// Component for Explorer View
var FlashcardExplorer = React.createClass({
	getInitialState: function () {
		return { };
	},

	render: function () {
		return (
			<div>
			  <h3>Flashcard Explorer</h3>
			    <div>
			      <ol>
			        <FlashcardContainer 
				  question="question 1"
				  answer="answer 1" />
			        <FlashcardContainer 
				  question="question 2"
				  answer="answer 2" />
			        <FlashcardContainer 
				  question="question 3"
				  answer="answer 3" />
			      </ol>
			    </div>
			</div>
		);
	}
});

export default FlashcardExplorer;
