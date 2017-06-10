// import node packages

// import local files

// Interface/Helper Functions
function getFlashcards (notebook) {
  var flashcards = [];

  for (var s in notebook.subnotes) {
    var subnote = notebook.subnotes[s];
    for (var f in subnote.flashcards) {
      var cardData = subnote.flashcards[f];

      var flashcard = {
        noteId: s,
        cardIdx: f,
        qaPairs: cardData.qas,
        tags: cardData.tags
      };

      flashcards.push(flashcard);
    }
  }

  return flashcards;

}

function getAllCards (library) {
  var flashcards = [];

  if (typeof library != "undefined") {
    for (var n in library) {
      var notebook = library[n];

      if (notebook && notebook.notebook && notebook.notebook.subnotes) {
        for (var s in notebook.notebook.subnotes) {
          var subnote = notebook.notebook.subnotes[s];

          if (subnote && subnote.flashcards && subnote.flashcards.length > 0) {
            for (var f in subnote.flashcards) {
              var flashcard = subnote.flashcards[f];

              flashcard.notebookId = n;
              flashcard.subnoteId = s;
              flashcard.cardIdx = f;
              flashcard.subtopic = subnote.subtopic;

              flashcards.push(flashcard);
            } // end for in flashcards
          } // end if flashcards exists
        } // end for in subnotes
      } // end if subnotes exists
    } //end for in library
  } // end if library exists

  return flashcards;
} // end getAllCards

function convertTreeCard (treeCard, treeNode, cardIdx) {
  var flashcard = {
    notebookId: 'Unavailable',
    subnoteId: treeNode.id,
    cardIdx: cardIdx,
    subtopic: treeNode.title,
    qas: treeCard.qas,
    tags: treeCard.tags
  };

  return flashcard;
} // end convertTreeCard

module.exports = {
  getFlashcards: getFlashcards,
  getAllCards: getAllCards,
  convertTreeCard: convertTreeCard
}
