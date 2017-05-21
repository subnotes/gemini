// import node packages
import React from 'react';

// Flashcard Presenter component
class Flashcard extends Component {

  constructor (props) {
    super(props);

    // Member Variables
    /* Need to implement this
    this.propTypes = {
    };
     */
    this.state = {
      answered: false,
    };

    // Function Bindings
    this.flipCard = this.flipCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.render = this.render.bind(this);
  } // end constructor

  flipCard () {
    this.setState( { answered: true } );
  } // end flipCard

  nextCard () {
    this.setState( { answered: false } );
    this.props.nextCard();
  } // end nextCard

  handleDelete () {
    console.log("Delete pressed on: ", this.props.flashcard.cardIdx);
    this.props.handleDelete(this.props.flashcard.cardIdx);
  } // end handleDelete

  render () {
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
  } // end render

}

export default Flashcard;
