// import node packages

// import local files

// Interface/Helper Functions
function getFlashcards (notebook) {
  console.log("Interface helper is running.");
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

  for (var n in library) {
    var notebook = library[n];

    for (var s in notebook['notebook']) {
      var subnote = notebook['notebook'][s];

      for (var f in subnote.flashcards) {
        var flashcard = subnote.flashcards[f];

        flashcard.notebookId = n;
        flashcard.subnoteId = s;
        flashcard.cardIdx = f;

        flashcards.push(flashcard);
      }
    }
  }

  return flashcards;
} // end getAllCards

function convertTreeCard (treeCard, noteId, cardIdx) {
  var flashcard = {
    noteId: noteId,
    cardIdx: cardIdx,
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
