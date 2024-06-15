function getTime(timestamp) {
  const milliseconds = timestamp * 1000;
  const date = new Date(milliseconds);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options);
}

function getData() {
  const apiUrl = "https://mgm.ub.ac.id/weather.json";
  const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(apiUrl);

  fetch(proxyUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Temperature data:", data.contents);

      const weatherData = JSON.parse(data.contents);

      const coordLat = weatherData.coord.lat;
      const coordLon = weatherData.coord.lon;
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const sunrise = getTime(weatherData.sys.sunrise);
      const sunset = getTime(weatherData.sys.sunset);

      document.getElementById("coord").innerText = `Lat(${coordLat}), Lon(${coordLon})`;
      document.getElementById("description").innerText = description;
      document.getElementById("temperature").innerText = `${temp} °C`;
      document.getElementById("feels-like").innerText = `${feelsLike} °C`;
      document.getElementById("sunrise").innerText = `${sunrise} GMT+7`;
      document.getElementById("sunset").innerText = `${sunset} GMT+7`;

      const iconElement = document.getElementById("weather-icon");
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon" width="180">`;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      document.getElementById("temperature").innerText = "Data not available";
      document.getElementById("feels-like").innerText = "Data not available";
      document.getElementById("description").innerText = "Data not available";
      document.getElementById("coord").innerText = "Data not available";
      document.getElementById("sunrise").innerText = "Data not available";
      document.getElementById("sunset").innerText = "Data not available";
    });
}

window.onload = getData;
