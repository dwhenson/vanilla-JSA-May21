/* ====================================================
  Variables
  ==================================================== */
const app = document.querySelector("#app");
const endpointArticle = "https://vanillajsacademy.com/api/dragons.json";
const endpointAuthor = "https://vanillajsacademy.com/api/dragons-authors.json";
const errorMessage = "<p>Sorry, we can't get any dragon training articles right now</p>";
/* ====================================================
  Functions
  ==================================================== */

/* Helpers
/* ==================================================== */

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
  return str.replace(/javascript:/gi, "").replace(/[^\w-_. ]/gi, function (c) {
    return `&#${c.charCodeAt(0)};`;
  });
}

/**
 * Handles any errors that occur during fetch
 * @param      {object}  element  The element where content is rendered
 * @param      {string}  message  The message to render
 * @param      {object}  error    The error object
 */
function errorHandler(element, message, error) {
  // Fall back text and quote
  element.innerHTML = message;
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
function convertToJson(responses) {
  return Promise.all(
    responses.map(function (response) {
      return response.ok ? response.json() : Promise.reject(new Error(response.status));
    })
  );
}

/**
 * Find the first matching author
 * @param  {Array}  authors The array of author objects
 * @param  {String} name    The author name to search for
 * @return {Object}         The author (or undefined if no match)
 */
function getAuthor(authors, name) {
  // Iterate over every author object in the authors array
  return authors.find(function (author) {
    // Check if the required property === the string
    return author.author === name;
    // If there is a match return that object, otherwise return undefined
  });
}

/* App
/* ==================================================== */

/**
 * Render the data from the fetch request to HTML
 * @param      {object}  element        The element to render the data
 * @param      {array}   articles  The array of articles
 * @param      {array}  authors   The array of authors
 */
function renderArticles(element, articles, authors) {
  // If no array or it's empty call the errorHandler and return
  if (!articles || articles.length < 1) {
    errorHandler();
    return;
  }
  // Else, if the array and it's items are there, render the text
  element.innerHTML = `
    <ul role="list" class="flow-section">
    ${articles
      .map(function (article) {
        const author = getAuthor(authors, article.author);
        return `<li class="flow-content">
        <article class="flow-content">
          <h2>
            <a href="#${sanitizeHTML(article.url)}">${sanitizeHTML(article.title)}</a>
          </h2>
          <footer class="wrapper flow-content">
            <p class="author">By ${
              author
                ? `${sanitizeHTML(article.author)} - <i>${sanitizeHTML(author.bio)}`
                : `${sanitizeHTML(article.author)}`
            }</i></p>
            <p class="published">
              <time datetime="${w3date(sanitizeHTML(article.pubdate))}">
                ${sanitizeHTML(article.pubdate)}
              </time>
            </p>
          </footer>
          <p>${sanitizeHTML(article.article)}</p>
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
    const response = await Promise.all([fetch(endpointArticle), fetch(endpointAuthor)]);
    const data = await convertToJson(response);
    renderArticles(app, data[0].articles, data[1].authors);
  } catch {
    errorHandler(app, errorMessage);
  }
}

/* ====================================================
  Inits and Event Listeners
  ==================================================== */
fetchArticles();
