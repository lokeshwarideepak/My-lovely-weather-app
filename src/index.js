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
  weatherAppDate.innerHTML = `${day} ${date} ${month} ${year} | ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${timeOfDay}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {

  }
}
forecastHTML =
 forecastHTML +
`
   <div class="col-2">
          <div class="weather-forecast-date">${formatDay
            (forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon}@2x.png"
          alt="" width="44"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
`;
}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
console.log(coordinates);
 let apiKey = "3b6843c21c9e3001b9979f4f906678e2";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?
  lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&
  units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");


  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3b6843c21c9e3001b9979f4f906678e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Perth");