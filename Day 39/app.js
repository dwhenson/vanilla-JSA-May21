function weatherApp({
  // Default values
  elementSelector = "#app",
  errorWeather = "Can't get the weather right now",
  errorLocation = "Unable to retrieve your location",
  key = false,
  icon = true,
  imperial = false,
}) {
  /* ====================================================
   Variables
   ==================================================== */
  const endpoint = "https://api.weatherbit.io/v2.0/current?";
  const app = document.querySelector(elementSelector);

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
    app.innerHTML = `
  <p>
    The weather in <strong>${data.city_name}</strong> is <strong>
    ${data.weather.description.toLowerCase()}</strong> at the moment,
    and its <strong>${data.app_temp} &#176;${imperial ? "Fahrenheit" : "Celsius"}</strong>
  </p>
  ${
    icon
      ? `<img src="icons/${data.weather.icon}.png" alt="${data.weather.description}">`
      : ""
  }
  `;
  }

  /**
   * Gets the weather.from the weatherBits API
   * @param      {string}   latitude   The latitude value
   * @param      {string}   longitude  The longitude value
   * @return     {Promise}  The weather from the API call
   */
  async function getWeather(latitude, longitude) {
    const response = await fetch(
      `${endpoint}lat=${latitude}&lon=${longitude}&key=${key}${
        imperial ? "&units=I" : "&units=M"
      }`
    );
    const data = await checkResponse(response);
    renderWeather(data.data[0]);
  }

  /**
   * Assigns lat/long values to and calls getWeather
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
    // Check if API key is provided.
    if (!key) {
      app.textContent =
        "You need to provide an API key from weatherBit.com to use the app";
      return;
    }
    // Check if geolocation supported and get positions
    if (!navigator.geolocation) {
      app.textContent = "Geolocation is not supported by your browser";
    } else {
      navigator.geolocation.getCurrentPosition(
        successLatLong,
        () => error(errorLocation),
        { enableHighAccuracy: true }
      );
    }
  }

  /* ====================================================
   Inits and Event Listeners
   ==================================================== */
  getLatLong();
}

// App instantiation
const options = {
  key: "c81e60446f394ac3b6efb4b5c187cafa",
  elementSelector: "#app",
  errorWeather: "Can't help you with the weather - can you look outside instead?",
  errorLocation: "Soz, we've no idea where you are!",
  icon: true,
  imperial: false,
};

weatherApp(options);
