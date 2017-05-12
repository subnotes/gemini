// import node packages
import React from 'react';

// import local components
import FlashcardContainer from './containers/FlashcardContainer';
import FlashcardInterface from './interfaces/FlashcardInterface';

// Local flashcard array for testing

// Component for Explorer View
var FlashcardExplorer = React.createClass({
	getInitialState: function () {
		return { flashcards: false};
	},

	componentWillMount: function () {
		var flashcards = FlashcardInterface.getFlashcards(this.props.notebook);
		this.setState({flashcards: flashcards});
	},

	render: function () {
		return (
			<div>
			  <h3>Flashcard Explorer</h3>
			    <div>
			      <ul>
			      	{this.state.flashcards.map(card => (
				  <FlashcardContainer
				    question={card[0].question}
				    answer={card[0].answer} />
				  ))}
			      </ul>
			    </div>
			</div>
		);
	}
});

export default FlashcardExplorer;
