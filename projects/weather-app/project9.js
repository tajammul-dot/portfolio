
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
    const apiKey = '83fc1834c81b1ffce389bacf7fa8660a'; //  API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const temp = data.main.temp;
            const condition = data.weather[0].description;
            const cityName = data.name;
            const visibility = data.visibility;
            const humidity = data.main.humidity;
            const rain = data.rain?.["1h"] ?? 0;

            document.getElementById("weather1").innerHTML = `
          <p><strong>City:</strong> ${cityName}</p>
           <p><strong>Temperature:</strong> ${temp}°C</p>
           <p><strong>Condition:</strong> ${condition}</p>
           <p><strong>Humidity:</strong> ${humidity}</p>
           <p><strong>Rain:</strong> ${rain}</p>
           <p><strong>Visibility:</strong> ${visibility}</p>
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

const cities = [
    "Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi",
    "Multan", "Quetta", "Peshawar", "Hyderabad", "Gujranwala",
    "London", "New York", "Tokyo", "Paris", "Delhi"
];

const cityInput = document.getElementById("cityName");
const dropBox = document.getElementById("drop-box");

cityInput.addEventListener('input', () => {
    const input = cityInput.value.toLowerCase();
    dropBox.innerHTML = "";

    if (input === "") return;

    const filtered = cities.filter(city =>
        city.toLowerCase().startsWith(input)
    );

    filtered.forEach(city => {
        const div = document.createElement("div");
        div.textContent = city;
        div.addEventListener("click", () => {
            cityInput.value = city;
            dropBox.innerHTML = "";
        });
        dropBox.appendChild(div);
    });
});

document.getElementById("btn2").addEventListener("click", getWeather2);

function getWeather2() {
    const xhr = new XMLHttpRequest();
    const apiKey = '83fc1834c81b1ffce389bacf7fa8660a';
    let city = cityInput.value.trim();

    if (city === "") {
        document.getElementById('weather2').innerHTML = '❗ Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const temp = data.main.temp;
            const condition = data.weather[0].description;
            const cityName = data.name;
            const visibility = data.visibility;
            const humidity = data.main.humidity;
            const rain = data.rain?.["1h"] ?? 0;

            document.getElementById('weather2').innerHTML = `
          <p><strong>City:</strong> ${cityName}</p>
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Condition:</strong> ${condition}</p>
          <p><strong>Humidity:</strong> ${humidity}</p>
          <p><strong>Rain:</strong> ${rain} mm</p>
          <p><strong>Visibility:</strong> ${visibility} meters</p>
        `;
        } else {
            document.getElementById('weather2').innerHTML = '❌ Error: City not found.';
        }
    };

    xhr.onerror = function () {
        document.getElementById('weather2').innerHTML = '❌ Request failed.';
    };

    xhr.send();
}

// Optional: Hide dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".app-card")) {
        dropBox.innerHTML = "";
    }
});