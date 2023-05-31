const apiKey = "4758e4265c9aac6f07775fee0b0459dd";
const city = "Miami";

fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // testing below
    // console.log(data);
    // this converts API temperature (received in Kelvin) to Fahrenheit(what I am familiar with)
    const tempFah = Math.round(((data.main.temp - 273.15)*1.8)+32);
    
    // This gets the forecast and conditions
    const forecast = data.weather[0].main;
    
    // This updates the temperature and forecast elements
    document.querySelector(".temp-value").textContent = tempFah;
    document.querySelector(".forecast-value").textContent = forecast;

    // Check if the forecast includes a thunderstorm
    if (forecast.toLowerCase().includes("thunderstorm")) {
      // If so, let's add some emojis
      document.querySelector(".interactive").innerHTML = "<p>⚡️⚡️⚡️</p>";
    } else {
      // If not, no emojis
      document.querySelector(".interactive").innerHTML = "";
    }
  })
  .catch(error => console.error('Error:', error));


// 
const cityForm = document.querySelector("#city-form");
const cityInput = document.querySelector("#city-input");