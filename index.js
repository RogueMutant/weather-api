const apiKey = "4683642e9c1869bbd7d54f14ebda24ed";
const apiUrlZip =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputEl = document.getElementById("input-el");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(info) {
  let actualInfo = isNaN(info)
    ? await fetch(apiUrl + info + `&appid=${apiKey}`)
    : await fetch(apiUrlZip + info + `&appid=${apiKey}`);
  const data = await actualInfo.json();

  if (actualInfo.status == 404) {
    document.querySelector(".p-el").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".p-el").style.display = "none";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.floor(data.main.temp) + "°c";
    document.querySelector(".humidity").textContent = data.main.humidity;
    document.querySelector(".wind").textContent = data.wind.speed + " Km/h";

    switch (data.weather[0].main) {
      case "Rain":
        weatherIcon.src = "icons/rain.png";
        break;
      case "Clear":
        weatherIcon.src = "icons/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "icons/clouds.png";
        break;
      case "Mist":
        weatherIcon.src = "icons/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "icons/snow.png";
        break;
      case "Drizzle":
        weatherIcon.src = "icons/drizzle.png";
        break;
      default:
        weatherIcon.src = "icons/clear.png";
    }
  }
}

function findCity() {
  if (inputEl.value === "") {
    alert("you have to enter the name of a city");
  } else {
    checkWeather(inputEl.value);

    inputEl.value = "";
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const apiCoord = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}`;
    async function defaultState() {
      let response = await fetch(apiCoord + `&appid=${apiKey}`);
      let result = await response.json();
      console.log(result);
      document.querySelector(".city").textContent = result.name;
      document.querySelector(".temp").textContent =
        Math.floor(result.main.temp) + "°c";
      document.querySelector(".humidity").textContent = result.main.humidity;
      document.querySelector(".wind").textContent = result.wind.speed + " Km/h";
    }
    defaultState();
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
