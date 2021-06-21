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
 * Checks if the response is OK, and converts to json (or throws an error)
 * @param  {string} response Unprocessed response from request
 * @return {array}           Response converted to JSON or rejected promise
 */
function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(new Error(response.status));
}

/* Library
/* ==================================================== */
/**
 * Render the returned list of articles to HTML
 * @param      {sting}  data    The data from the API
 */
function renderArticles(element, array) {
  element.innerHTML = `

    <ul role="list" class="flow-section">
    ${array
      .map(function (article) {
        return `<li class="flow-content">
        <article>
          <h2><a href="#${article.url}">${article.title}</a></h2>
          <div class="wrapper">
            <p class="author">by ${article.author}</p>
            <p class="published"><time datetime=${article.pubdate.toISOString()}>${article.pubdate}</time></p>
          </div>
          <p>${article.article}</p>
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
