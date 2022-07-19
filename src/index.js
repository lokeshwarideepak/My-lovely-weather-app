setInterval(displayTimeAndDate, 1000);

function displayTimeAndDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let seconds = now.getSeconds();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  let weatherAppDate = document.querySelector("#weather-app-date");

  let formattedSeconds;
  let formattedHours;
  let formattedMinutes;
  let timeOfDay;

  if (seconds < 10) {
    formattedSeconds = `0${seconds}`;
  } else {
    formattedSeconds = seconds;
  }

  if (hours < 10) {
    formattedHours = `0${hours}`;
  } else {
    formattedHours = hours;
  }

  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  } else {
    formattedMinutes = minutes;
  }

  if (hours >= 12) {
    timeOfDay = `PM`;
  } else {
    timeOfDay = `AM`;
  }
  weatherAppDate.innerHTML = `${day} ${month} ${date} ${year} | ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${timeOfDay}`;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  let apiKey = "3b6843c21c9e3001b9979f4f906678e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let enterCityForm = document.querySelector("#search-city");
enterCityForm.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response.date);
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let cityName = response.data.name;
  let currentCityTemp = document.querySelector("#current-temp");
  currentCityTemp.innerHTML = `${temperature}˚C`;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = `${description}`;
  let currentCityName = document.querySelector("h1");
  currentCityName.innerHTML = `${cityName}`;
}

function showPosition(position) {
  console.log(position);
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let apiKey = "3b6843c21c9e3001b9979f4f906678e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

function toFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 17;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);
