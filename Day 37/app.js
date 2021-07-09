/* ====================================================
   Variables
   ==================================================== */
// Elements
const app = document.querySelector("#app");
// Messages
const errorWeather = "Can't get the weather right now";
const endpoint = "https://api.weatherbit.io/v2.0/current?";
// API
const key = "c81e60446f394ac3b6efb4b5c187cafa";
const errorLocation = "Unable to retrieve your location";

/* ====================================================
   Functions
   ==================================================== */

/* Helpers
/* ==================================================== */

/**
 * Renders the error message to the HTML
 * @param {string}  message  The error message
 */
function error(message) {
  app.innerHTML = `<p>${message}</p`;
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
 * Renders the data from the APO call to the HTML
 * @param      {object}  data    The data from the API call
 */
function renderWeather(data) {
  console.log(data);
  app.innerHTML = `
  <p>
    The weather in <strong>${data.city_name}</strong> is <strong>
    ${data.weather.description.toLowerCase()}</strong> at the moment,
    and its <strong>${data.app_temp} &#176;C.</strong>
  </p>
  <img src="icons/${data.weather.icon}.png" alt="${data.weather.description}">
  `;
}

/**
 * Gets the weather.from the weatherBits API
 * @param      {string}   latitude   The latitude value
 * @param      {string}   longitude  The longitude value
 * @return     {Promise}  The weather from the API call
 */
async function getWeather(latitude, longitude) {
  const response = await fetch(`${endpoint}lat=${latitude}&lon=${longitude}&key=${key}`);
  const data = await checkResponse(response);
  renderWeather(data.data[0]);
}

/**
 * Assigns lat/long values to variables and calls getWeather
 * @param      {object}  position  The position object from the geolocation API
 */
function successLatLong(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude).catch(error(errorWeather));
}

/**
 * Gets the lat long.from the geolocation API
 */
function getLatLong() {
  if (!navigator.geolocation) {
    app.textContent = "Geolocation is not supported by your browser";
  } else {
    navigator.geolocation.getCurrentPosition(successLatLong, function () {
      error(errorLocation);
    });
  }
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
getLatLong();
