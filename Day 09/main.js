/* ====================================================
	Variables
	==================================================== */
const textarea = document.querySelector("#text");
const charCount = document.querySelector("#character-count");
const wordCount = document.querySelector("#word-count");
const wordCount = document.querySelector("#word-count");
const regex = /[\n\r\s]+/g

/* ====================================================
	Functions
	==================================================== */

function countWords(string) {
	const words = string.split(regex)
	const longWords = words.filter(function(word) {
		return word.length > 0;
	})
	return words.length - 1
}


function inputHandler() {
	charCount.textContent = `${textarea.value.length} characters`;
	wordCount.textContent = `${countWords(textarea.value)} words`
}

/* ====================================================
	Inits and Event Listeners
	==================================================== */
textarea.addEventListener("input", inputHandler);
