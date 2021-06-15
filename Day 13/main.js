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
    <p>You can't hack into a typewriter. That's all I have to say.</p>
  `;
  // Add error to console
  console.warn(error);
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
  blockquote.innerHTML = `<p></p>${data}</p>`;
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

/**
 * Render HTML that is dependent on JavaScript
 */
function renderButton() {
  const button = document.createElement("button");
  button.textContent = "More Ron!";
  blockquote.after(button);
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

// Render the button using JS as only functions if JS loads
renderButton();
// Initial fetch quotes on load
fetchQuotes();
// Listen for additional quote request
document.addEventListener("click", inputHandler);
