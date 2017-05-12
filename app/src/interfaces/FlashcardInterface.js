// import node packages

// import local files

// Interface/Helper Functions
function getFlashcards (notebook) {
	console.log("Interface helper is running.");
	var flashcards = [];

	for (var s in notebook.subnotes) {
		var subnote = notebook.subnotes[s];
		for (var f in subnote.flashcards) {
			var flashcard = subnote.flashcards[f];
			flashcards.push(flashcard.qas);
		}
	}

	return flashcards;
	
}
	
module.exports = {
	getFlashcards: getFlashcards
}
