const API_KEY = "73697e9be94c4ed0b9f23123250105";

// Check if we're in a browser environment before accessing document
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Add event listener for Enter key
  document
    .getElementById("cityInput")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        getWeather();
      }
    });
}

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    document.getElementById("weatherResult").innerHTML = `
      <p style="color: #ff6b6b; text-align: center;">Please enter a city name</p>
    `;
    return;
  }

  // Show loading animation
  document.getElementById("weatherResult").innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <div class="loading-spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  `;

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Get weather icon based on condition
      const iconUrl = data.current.condition.icon;
      const output = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${iconUrl}" alt="${data.current.condition.text}" class="weather-icon">
        <p>🌡️ Temperature: ${data.current.temp_c}°C</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
        <p>🌤️ Condition: ${data.current.condition.text}</p>
        <p>💨 Wind: ${data.current.wind_kph} km/h</p>
      `;
      document.getElementById("weatherResult").innerHTML = output;
    })
    .catch((err) => {
      document.getElementById("weatherResult").innerHTML = `
        <p style="color: #ff6b6b; text-align: center;">Error fetching weather data. Please try again.</p>
      `;
      console.error(err);
    });
}
