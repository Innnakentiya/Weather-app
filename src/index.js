let now = new Date();
let date = now.getDate();
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[now.getDay()];

let months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
let month = months[now.getMonth()];
let dayDate = document.querySelector(".date");
dayDate.innerHTML = ` ${month} ${date}`;
let dayElement = document.querySelector(".day");
dayElement.innerHTML = ` ${day}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `5-Day Weather Forecast for ${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert("Please type a city");
  }
  let city = searchInput.value;
  let apiKey = "1d69840c0c590c7b98248b4102610f33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperatureMax = Math.round(response.data.main.temp_max);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureInput = document.querySelector("#temperature-input");
  temperatureInput.innerHTML = `${temperatureMin}℃/${temperatureMax}℃`;
  let description = document.querySelector(".temperature-description");
  description.innerHTML = response.data.weather[0].main;
}
///
function searchLocation(position) {
  let apiKey = "1d69840c0c590c7b98248b4102610f33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Weather Forecast for current location`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationElement = document.querySelector("#current-location");
currentLocationElement.addEventListener("click", getCurrentLocation);
