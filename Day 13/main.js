/* ====================================================
  Variables
  ==================================================== */
const blockquote = document.querySelector("blockquote");
const endpoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

/* ====================================================
  Functions
  ==================================================== */

/* Helpers
/* ==================================================== */
/**
 * Handle any errors
 * @param      {object}  error   The error object
 */
function errorHandler(error) {
  // Fall back text and quote
  blockquote.innerHTML = `
    <p>Sorry, we can't get any more Ron right now. In his own words:</p>
    <p><strong>You can't hack into a typewriter. That's all I have to say.</strong></p>
  `;
  // Add error to console
  console.error(error);
}

/**
 * converts response from an API to a JSON object
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function convertToJSON(response) {
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

/* Library
/* ==================================================== */
/**
 * Render the returned data to HTML
 * @param      {sting}  data    The data from the API
 */
function renderQuote(data) {
  blockquote.innerHTML = `<p><strong>${data}</strong></p>`;
}

/**
 * Fetches quotes from the API
 */
function fetchQuotes() {
  fetch(endpoint) //
    .then(convertToJSON) //
    .then(renderQuote) //
    .catch(errorHandler);
}

/* Handlers
/* ==================================================== */

/**
 * Handle inputs to render the number of words and characters in the HTML
 */
function inputHandler(event) {
  if (!event.target.matches("button")) return;
  fetchQuotes();
}

/* ====================================================
  Inits and Event Listeners
  ==================================================== */

/**
 * Render HTML that is dependent on JavaScript
 */
function renderButton() {
  const button = document.createElement("button");
  button.textContent = "More Ron!";
  blockquote.after(button);
}

renderButton();
document.addEventListener("click", inputHandler);
