// Get the API Key from OPenWeatherMap
const apiKey = "f3250885431f58878f508fbb70480058";

// \Select the DOM
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

//Add event listener to the search button

searchBtn.addEventListener('click', async function () {
    const city = cityInput.value;
    const coordinates = await fetchCoordinates(city);
    fetchWeather(coordinates.lat, coordinates.lon);

})
async function fetchCoordinates(city) {

    //Function to get the city's coordinates using the OpenWeatherAPI:

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const [data] = await response.json();
    if (data) {
        return { lat: data.lat, lon: data.lon }

    } else {
        return null;
    }
}

// Function to get the weather at a given set of coordinates
async function fetchWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
        weatherInfo.innerHTML = `<h2>${data.name}, 
        ${data.sys.country}</h2>
    <p>${data.weather[0].description} </p>
    <p>Temperature: ${data.main.temp} C </p>`;

    } else {
        weatherInfo.innerHTML = "<p> City not found </p>";

    }
}
