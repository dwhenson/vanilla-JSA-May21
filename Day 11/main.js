/* ====================================================
  Variables
  ==================================================== */
const blockquote = document.querySelector("blockquote");
const button = document.querySelector("button");
const endpoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

/* ====================================================
  Functions
  ==================================================== */

/**
 * Handle inputs to render the number of words and characters in the HTML
 */
function inputHandler(event) {
  console.log(event.target, blockquote);
}

/* ====================================================
  Inits and Event Listeners
  ==================================================== */
button.addEventListener("click", inputHandler);
