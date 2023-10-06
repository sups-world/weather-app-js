const apikey = "";
// enter api key above to run this app
const weatDataElement = document.getElementById("weather-data");

const cityInputElement = document.getElementById("city-input");

const formElement = document.querySelector("form");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputElement.value;

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!result.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await result.json();
    // console.log(data);

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    // dynamic array
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    weatDataElement.querySelector(".icon").innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="Weather-icon"
  />`;
    weatDataElement.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatDataElement.querySelector(".description").textContent = description;

    weatDataElement.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
    //   comma will show up without join("")
  } catch (error) {
    console.error("unable to fetch weather data::", error);
    weatDataElement.querySelector(".icon").innerHTML = "";

    weatDataElement.querySelector(".temperature").textContent = "";

    weatDataElement.querySelector(".description").textContent =
      "Error occurred!! Try again";

    weatDataElement.querySelector(".details").innerHTML = "";
  }
}
