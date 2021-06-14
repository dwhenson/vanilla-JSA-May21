/* ====================================================
  Variables
  ==================================================== */
const textarea = document.querySelector("#text");

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
  return string.split(/[\s]+/g).filter((word) => word.length > 0).length;
}

/**
 * Handle inputs to render the number of words and characters in the HTML
 */
function inputHandler() {
  const charCount = document.querySelector("#character-count");
  const wordCount = document.querySelector("#word-count");
  // Update variable contents based on textInput value
  charCount.textContent = `${textarea.value.length} ${
    // if value is singular render correct word
    textarea.value.length === 1 ? "character" : "characters"
  }`;
  wordCount.textContent = `${countWords(textarea.value)} ${
    // if value is singular render correct word
    countWords(textarea.value) === 1 ? "word" : "words"
  }`;
}

/**
 * Render HTML that is dependent on JavaScript
 */
function renderCountUpdates() {
  // Create <p> to hold JS dependent content
  const countUpdates = document.createElement("p");
  // Add aria attributes
  countUpdates.setAttribute("aria-live", "polite");
  countUpdates.setAttribute("aria-atomic", "true");
  // Create nested elements and content
  countUpdates.innerHTML = `
    You've written <strong><span id="word-count">0 words</span></strong>
    and <strong><span id="character-count">0 characters</span></strong>`;
  // Add JS dependent content to the DOM
  textarea.after(countUpdates);
}

/* ====================================================
  Inits and Event Listeners
  ==================================================== */
renderCountUpdates();
textarea.addEventListener("input", inputHandler);
