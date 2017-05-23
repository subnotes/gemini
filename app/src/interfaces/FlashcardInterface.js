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

function convertTreeCard (treeCard, noteId, cardIdx) {
  var flashcard = {
    noteId: noteId,
    cardIdx: cardIdx,
    qaPairs: treeCard.qas,
    tags: treeCard.tags
  };

  return flashcard;
}

module.exports = {
  getFlashcards: getFlashcards,
  convertTreeCard: convertTreeCard
}
