async function getWeather() {
    const place = document.getElementById("input-place").value;

    if (place === "") {
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=cd4f1d5f86f947198e763014251303&q=${place}&aqi=no`;
    const response = await fetch(url);
    const result = await response.json();
    const results = document.querySelector('.results');

    if (result.error) {
        results.style.display = 'block';
        results.innerHTML = `<p>$Error : ${result.error.code} ${result.error.message}</p>`;
        document.getElementById("input-place").value = "";
        return;
    }

    results.style.display = 'block';
    results.innerHTML =
        `<h3>City-name: ${result.location.name} &nbsp &nbsp Country: ${result.location.country}</h3>
    <p>latitude: ${result.location.lat}  &nbsp &nbsp longitude:${result.location.lon}</p>
    <p>temperature: ${result.current.temp_c}<sup>o</sup>C &nbsp &nbsp feels like: ${result.current.feelslike_c}<sup>o</sup>C</p>
    <div class="type"><img src = "${result.current.condition.icon}"></img><p>weather-type: ${result.current.condition.text}</p> </div>
    <p>wind-speed: ${result.current.wind_kph}kmph  &nbsp &nbsp pressure: ${result.current.pressure_mb}mb  &nbsp &nbsp  Humidity: ${result.current.humidity}%</p>`;
    document.getElementById("input-place").value = "";
}

const place = document.getElementById("input-place");
place.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        getWeather();
    }
});