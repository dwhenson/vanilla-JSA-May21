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
function checkResponses(responses) {
  return Promise.all(
    responses.map(function (response) {
      return response.ok ? response.json() : Promise.reject(new Error(response.status));
    })
  );
}

function checkBio(arrayAuthors, articleAuthor) {
  for (const author of arrayAuthors) {
    if (author.bio && author.author === articleAuthor) {
      return `<p>${author.bio}</p>`;
    } else {
      return "";
    }
  }
}

/* App
/* ==================================================== */

/**
 * Render the data from the fetch request to HTML
 * @param      {object}  element        The element to render the data
 * @param      {array}   arrayArticles  The array of articles
 * @param      {array}  arrayAuthors   The array of authors
 */
function renderArticles(element, arrayArticles, arrayAuthors) {
  // If no array or it's empty call the errorHandler and return
  if (!arrayArticles || arrayArticles.length < 1) {
    errorHandler();
    return;
  }
  // Else, if the array and it's items are there, render the text
  element.innerHTML = `
    <ul role="list" class="flow-section">
    ${arrayArticles
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
        ${checkBio(arrayAuthors, author)}
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
    const response = await Promise.all([fetch(endpointArticle), fetch(endpointAuthor)]); //
    const data = await checkResponses(response); // see helper functions
    renderArticles(app, data[0].articles, data[1].authors); //
  } catch {
    errorHandler(app, errorMessage); // see helper functions
  }
}

/* ====================================================
  Inits and Event Listeners
  ==================================================== */
fetchArticles();
