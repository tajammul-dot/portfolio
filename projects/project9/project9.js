// Function to get weather using latitude & longitude
const getLocation = () =>
    new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            p => resolve({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
            reject,
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });

function getWeatherByCoordinates(lat, lon) {
    document.getElementById('latBox').textContent = lat.toFixed(6);
    document.getElementById('lonBox').textContent = lon.toFixed(6);
    const apiKey = '83fc1834c81b1ffce389bacf7fa8660a'; // your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const cityName = data.name;
            const temp = data.main.temp;
            const condition = data.weather[0].description;

            document.getElementById("weather1").innerHTML = `
          <p><strong>City:</strong> ${cityName}</p>
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Condition:</strong> ${condition}</p>
        `;
        } else {
            document.getElementById("weather1").innerText = "Failed to fetch weather data.";
        }
    };

    xhr.onerror = function () {
        document.getElementById("weather1").innerText = "Request error.";
    };

    xhr.send();
}

document.getElementById("btn1").addEventListener("click", () => {
    getLocation()
        .then(({ latitude, longitude }) => {
            console.log("Coordinates:", latitude, longitude);
            getWeatherByCoordinates(latitude, longitude);
        })
        .catch(err => {
            console.error(err);
            document.getElementById("weather1").innerText = "Could not get location.";
        });
});


// Function to get weather by city

document.getElementById("btn2").addEventListener("click", getWeather2)

function getWeather2() {
    const xhr = new XMLHttpRequest();
    const apiKey = '83fc1834c81b1ffce389bacf7fa8660a';
    let city = document.getElementById("cityName").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const temp = data.main.temp;
            const condition = data.weather[0].description;
            const cityName = data.name;

            document.getElementById('weather2').innerHTML =
                `<p><strong>City:</strong> ${cityName}</p>
           <p><strong>Temperature:</strong> ${Math.round(temp)}°C</p>
           <p><strong>Condition:</strong> ${condition}</p>`;
        } else {
            document.getElementById('weather2').innerHTML = 'Error fetching weather data.';
        }
    };

    xhr.onerror = function () {
        document.getElementById('weather2').innerHTML = 'Request failed.';
    };

    xhr.send();
}


