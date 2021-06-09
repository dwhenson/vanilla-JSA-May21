/* ====================================================
	Variables
	==================================================== */
const textarea = document.querySelector("#text");
const charCount = document.querySelector("#character-count");
const wordCount = document.querySelector("#word-count");

/* ====================================================
	Functions
	==================================================== */

/**
 * Counts the number of words.
 * @param      {String}  string  The string of text content
 * @return     {Number}  Number of words.
 */
function countWords(string) {
	// split string  on spaces or returns into words, remove 'words' of 1 space
	// return the filtered number of splits (i.e. words)
	return string.split(/[\n\r\s]+/g).filter((word) => word.length > 0).length;
}

/**
 * Handle inputs to render the number of words and characters in the HTML
 */
function inputHandler() {
	charCount.textContent = `${textarea.value.length} ${
		// if value is singular render correct word
		textarea.value.length === 1 //
			? "character"
			: "characters"
	}`;
	wordCount.textContent = `${countWords(textarea.value)} ${
		// if value is singular render correct word
		countWords(textarea.value) === 1 //
			? "word"
			: "words"
	}`;
}

/* ====================================================
	Inits and Event Listeners
	==================================================== */
textarea.addEventListener("input", inputHandler);
