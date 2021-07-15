/**
 * Gets the weather based on a user's location
 * @param      {string}  APIkey    The ap key
 * @param      {string}  selector  The element selector
 * @param      {object}  options   The options available for users
 */
function weatherApp(APIkey, selector, options) {
  /* ====================================================
   Variables
   ==================================================== */
  // Default values
  const defaults = {
    errorWeather: "Can't get the weather right now",
    errorLocation: "Unable to retrieve your location",
    mainMessage: "It is currently {{temp}} degrees and {{conditions}} in {{city}}.",
    icon: true,
    units: "M",
  };
  // The user values merged with the default options
  const { errorWeather, errorLocation, mainMessage, icon, units } = Object.assign(
    defaults,
    options
  );
  const endpoint = "https://api.weatherbit.io/v2.0/current?";
  const element = document.querySelector(selector);

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
    return str
      .toString()
      .replace(/javascript:/gi, "")
      .replace(/[^\w-_. ]/gi, function (c) {
        return `&#${c.charCodeAt(0)};`;
      });
  }

  /**
   * Get the weather description
   * @param  {Object} weather The weather data
   * @return {String}         The weather description
   */
  function getDescription(data) {
    return mainMessage
      .replace("{{temp}}", sanitizeHTML(data.app_temp))
      .replace("{{conditions}}", sanitizeHTML(data.weather.description.toLowerCase()))
      .replace("{{city}}", sanitizeHTML(data.city_name));
  }

  /**
   * Renders the error message to the HTML
   * @param {string}  message  The error message
   */
  function error(message) {
    element.innerHTML = `<p>${message}</p`;
  }

  /**
   * Checks response.ok, if true, converts to json (else throws an error)
   * @param  {string} response Unprocessed response from request
   * @return {array}           Response converted to JSON or rejected promise
   */
  function checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(new Error(response.status));
  }

  /**
   * Checks if required parameters are provided
   */
  function checkParams() {
    // Check if element to render HTML into is provided
    if (!element) {
      console.warn("Provide a valid selector for the element to render HTML into");
      return;
    }
    // Check if API key is provided.
    if (!key) {
      element.textContent =
        "You need to provide an API key from weatherBit.com to use the element";
    }
  }

  /* App
/* ==================================================== */
  /**
   * Renders the data from the APO call to the HTML
   * @param      {object}  data    The data from the API call
   */
  function renderWeather(data) {
    element.innerHTML = `
    <p>${getDescription(data)}</p>
  ${
    icon
      ? `<img src="icons/${data.weather.icon}.png" alt="${data.weather.description}">`
      : ""
  }`;
  }

  /**
   * Gets the weather.from the weatherBits API
   * @param      {string}   latitude   The latitude value
   * @param      {string}   longitude  The longitude value
   * @return     {Promise}  The weather from the API call
   */
  async function getWeather(latitude, longitude) {
    const response = await fetch(
      `${endpoint}lat=${latitude}&lon=${longitude}&key=${key}&units=${units}`
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
    checkParams();
    // Check if geolocation supported and get positions
    if (!navigator.geolocation) {
      element.textContent = "Geolocation is not supported by your browser";
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
const key = "c81e60446f394ac3b6efb4b5c187cafa";
const options = {
  // icon:
  // mainMessage:
  // units:
  // errorWeather:
  // units:
};

weatherApp(key, "#app", options);
