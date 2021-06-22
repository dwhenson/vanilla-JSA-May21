/* ====================================================
  Variables
  ==================================================== */
const app = document.querySelector("#app");
const endpoint = "https://vanillajsacademy.com/api/dragons.json";
const errorMessage = "<p>Sorry, we can't get any dragon training articles right now</p>";

/* ====================================================
  Functions
  ==================================================== */

/* Helpers
/* ==================================================== */

/**
 * Handles any errors that occur during fetch
 * @param      {object}  element  The element where content is rendered
 * @param      {string}  message  The message to render
 * @param      {object}  error    The error object
 */
function errorHandler(element, message, error) {
  // Fall back text and quote
  element.innerHTML = `${message}`;
  // Add error to console
  console.warn(error);
}

/**
 * Converts human readable date into machine readable date
 * @param      {String}  date    The date as a human readable string
 * @return     {String} A machine readable date
 */
function w3date(date) {
  // Create a new date from API string, convert to ISO format and trim unneeded values
  return new Date(`${date} UTC`).toISOString().substring(0, 10);
}

/**
 * Checks response.ok, if true, converts to json (else throws an error)
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

/* App
/* ==================================================== */
/**
 * Render the returned list of articles to HTML
 * @param      {sting}  data    The data from the API call
 */
function renderArticles(element, array) {
  // If no array or it's empty call the errorHandler and return
  if (!array || array.length < 1) {
    errorHandler();
    return;
  }
  // Else, if the array and it's items are there, render the text
  element.innerHTML = `
    <ul role="list" class="flow-section">
    ${array
      // Destructure each article object on array, and render
      .map(function ({ url, title, author, pubdate, article }) {
        return `<li class="flow-content">
        <article class="flow-content">
          <h2><a href="#${url}">${title}</a></h2>
          <footer class="wrapper">
            <p class="author">by ${author}</p>
            <p class="published">
              <time datetime="${w3date(pubdate)}">${pubdate}</time>
              </p>
          </footer>
          <p>${article}</p>
        </article>
      </li>`;
      })
      .join("")}
    </ul>`;
}

/**
 * Fetches quotes from the API
 */
async function fetchArticles() {
  try {
    const response = await fetch(endpoint); //
    const data = await checkResponse(response); // see helper functions
    renderArticles(app, data.articles); //
  } catch {
    errorHandler(app, errorMessage); // see helper functions
  }
}

/* ====================================================
  Inits and Event Listeners
  ==================================================== */
fetchArticles();
