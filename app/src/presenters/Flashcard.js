// import node packages
import React from 'react';

// Flashcard Presenter component
var Flashcard = React.createClass({
  getInitialState: function () {
    return {
      answered: false
    };
  },

  flipCard: function () {
    this.setState( { answered: true } );
  },

  nextCard: function() {
    this.setState( { answered: false } );
    this.props.nextCard();
  },

  handleDelete: function() {
    console.log("Delete pressed on: ", this.props.flashcard.cardIdx);
    this.props.handleDelete(this.props.flashcard.cardIdx);
  },

  componentWillMount: function () {
    return;
  },

  render: function () {
    switch(this.props.behavior) {
      case "manage":
        return(
          <div>
            <ul>
              {this.props.flashcard.qaPairs.map(
                  qaPair => <li> Question: <span>{qaPair.question}</span><br />
                                 Answer: <span>{qaPair.answer}</span> </li>
                  )}
            </ul>
            <button onClick={this.handleDelete}>Delete Card</button>
          </div>
        );
      case "review":
        if (!this.state.answered) {
          return(
            <span>
              Question: <span>{this.props.flashcard.qaPairs[this.props.viewIdx].question}</span><br />
              <button onClick={this.flipCard}>Flip Me</button>
            </span>
          );
        } else {
          return(
            <span>
              Answer: <span>{this.props.flashcard.qaPairs[this.props.viewIdx].answer}</span><br />
              <button onClick={this.nextCard}>Next Card</button>
            </span>
          );
        }
      default:
        return (
          <span>
            Something went wrong displaying this flashcard.
          </span>
        );
    }
  }
});

export default Flashcard;
