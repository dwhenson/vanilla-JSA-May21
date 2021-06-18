/* ====================================================
  Variables
  ==================================================== */
const blockquote = document.querySelector("blockquote");
const endpoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
const quotes = [];

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
function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

/**
 * Check the number of items in the array, remove the first if 50 items
 * @param      {Array}  array   The array
 */
function checkNumberOfQuotes(array) {
  if (array.length > 49) {
    array.shift();
  }
}

/* Library
/* ==================================================== */
/**
 * Render the returned data to HTML
 * @param      {sting}  data    The data from the API
 */
function renderQuote(data) {
  blockquote.innerHTML = `<p>${data}</p>`;
}

/**
 * Check if the quote has already been shown to the user
 * @param      {Object}  data    The data returned from the API
 * @return     {String}  The string to render to the HTML (or recall fetch if duplicate)
 */
function checkDuplicates(data) {
  if (!quotes.includes(data[0])) {
    quotes.push(data[0]);
    checkNumberOfQuotes(quotes); // see helper functions
    return data;
  }
  return fetchQuotes();
}

/**
 * Fetches quotes from the API
 */
function fetchQuotes() {
  fetch(endpoint) //
    .then(checkResponse) // see helper functions
    .then(checkDuplicates) //
    .then(renderQuote) //
    .catch(errorHandler); // see helper functions
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

// Render the button using JS as only functions if JS loads
renderButton();
// Initial fetch quotes on load
fetchQuotes();
// Listen for additional quote requests
document.addEventListener("click", inputHandler);
