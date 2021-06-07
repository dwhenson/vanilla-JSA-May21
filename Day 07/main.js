/* ====================================================
	Variables
	==================================================== */
const textarea = document.querySelector("#text");
const charCount = document.querySelector("#character-count");

/* ====================================================
	Functions
	==================================================== */

function inputHandler() {
	charCount.textContent = `${textarea.value.length} characters`;
}

/* ====================================================
	Inits and Event Listeners
	==================================================== */
textarea.addEventListener("input", inputHandler);
