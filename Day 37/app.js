const app = document.querySelector("#app");
const errorLocation = "Unable to retrieve your location";
const errorWeather = "Can't get the weather right now";

const key = "c81e60446f394ac3b6efb4b5c187cafa";
const endpoint = "https://api.weatherbit.io/v2.0/current?";

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

async function getWeather(latitude, longitude) {
  const response = await fetch(`${endpoint}lat=${latitude}&lon=${longitude}&key=${key}`);
  const data = await checkResponse(response);
  renderWeather(data.data[0]);
}

function successLatLong(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude).catch(error(errorWeather));
}

function getLatLong() {
  if (!navigator.geolocation) {
    app.textContent = "Geolocation is not supported by your browser";
  } else {
    navigator.geolocation.getCurrentPosition(successLatLong, function () {
      error(errorLocation);
    });
  }
}

getLatLong();
