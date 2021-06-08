//SELECT ELEMENTS...
const iconnElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-area p");
const descriptionElement = document.querySelector(".temp-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const humidityElement = document.querySelector(".humidity span")


//APP DATTA STORING.....
const weather = {};
weather.temprature = {
    unit:"celsius",
}

//VARIABLE CONSTANTS..
const kelvin = 273;
const key = "b42ae48563421acd6011933e28bf5365";

//GEOLOCTION CHECK...
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//SET USER'S POSITION...
function setPosition(position)
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

//SHOW ERRO WHEN ISSUE....
function showError(error)
{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//GET WEATHER FROM API....
function getWeather(latitude,longitude)
{
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response)
    {
        let data = response.json();
        return data;
    })
    .then(function(data)
    {
        weather.temprature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconid = data.weather[0].icon;
        weather.name = data.name;
        weather.country = data.sys.country;
        weather.humidity = data.main.humidity;
    })
    .then(function()
    {
        displayWeather();
    })
}

//DISPLAY WEATHER......(only change inner.HTML of the elements)
function displayWeather()
{
    iconnElement.innerHTML = `<img src = "icons/${weather.iconid}.png">`;
    tempElement.innerHTML = `${weather.temprature.value}°<span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.country}, ${weather.name}`;
    humidityElement.innerHTML = `${weather.humidity}`;
}

//TEMPERATURE CONVERSION....
function celsiustoFarenhite(temperature)
{
    return (temperature * 9/5) + 32;
}

//USER CLICK'S...
tempElement.addEventListener("click",function()
{
    if (weather.temprature.value === undefined)
    {
        return;
    }
    if (weather.temprature.unit === "celsius")
    {
        let farenhite = celsiustoFarenhite(weather.temprature.value);
        farenhite = Math.floor(farenhite);

        tempElement.innerHTML = `${farenhite}°<span>F</span>`;
        weather.temprature.unit = "Fahrenhite";
    }
    else{
        tempElement.innerHTML = `${weather.temprature.value}°<span>C</span>`;
        weather.temprature.unit = "celsius"
    }
})