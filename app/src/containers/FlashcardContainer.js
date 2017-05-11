// import node packages
import React from 'react';

// import related presenter
import Flashcard from '../presenters/Flashcard';		

// Main Container Component
var FlashcardContainer = React.createClass({
	getInitialState: function () {
		return {};
	},

	render: function () {
		return <Flashcard
			  question={this.props.question}
			  answer={this.props.answer} />;
	}
});

export default FlashcardContainer;
