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


// Here we are taking the input from the newly added form, so users can input their city
const cityForm = document.querySelector("#city-form");
const cityInput = document.querySelector("#city-input");

//This is going to make sure we know when the user submits the form
cityForm.addEventListener("submit", event => {
    //This prevents the form from being submitted with the default values
    event.preventDefault();
    // This will make sure that we use the inputed value to fetch data
    fetchWeatherdata(cityInput.value);
    const city = document.querySelector("#city-input").value;
});

function fetchWeatherdata(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
        //this will check if the response is valid
        if (!response.ok) {
            throw new Error("Could not fetch weather data");
        }
        return response.json();
    })
    .then(data => {
        //this will update the dashboard with the users response
        const tempFah = Math.round(((data.main.temp - 273.15)*1.8)+32);
        const forecast = data.weather[0].main;
        // takes the .temp-value id from html and updates it with the one from the API
        document.querySelector(".temp-value").textContent = tempFah;
        document.querySelector(".forecast-value").textContent = forecast;

        if (forecast.toLowerCase().includes("thunderstorm")) {
            document.querySelector(".interactive").innerHTML = "<p>⚡️⚡️⚡️</p>"
        } else {
            document.querySelector(".interactive").innerHTML = "";
        }
    }) 
    .catch(error => {
        console.error("Error:". error);
        //This will let the user know that there was a problem
        document.querySelector(".forecast-value").textContent = "Could not fetch weather data :( Double check your city maybe?"
    });
}

//fetch weather data for the default city when the page loads
fetchWeatherdata(city);

//makes sure it updates every 5 minutes
setInterval(() => fetchWeatherdata(city), 5*10*1000);