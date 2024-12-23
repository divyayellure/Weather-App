function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = '0ce8893472ae2179f1899a515c74c8d2';  // Your actual API key

    if (!city) {
        document.getElementById('error-message').textContent = 'Please enter a city name!';
        return;
    }

    // Check if the city name contains a country code
    const cityParts = city.split(','); // Split city name by commas (city, state/country)
    const cityName = cityParts[0].trim();
    const countryOrState = cityParts[1] ? cityParts[1].trim() : '';

    // Build the API URL with optional state or country
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${countryOrState ? ',' + countryOrState : ''}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === "404") {
                document.getElementById('error-message').textContent = 'City not found!';
                document.getElementById('weather-results').style.display = 'none';
            } else {
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('weather-results').style.display = 'block';
                document.getElementById('error-message').textContent = '';  // Clear error message
            }
        })
        .catch(error => {
            document.getElementById('error-message').textContent = `Error: ${error.message}`;
            console.error('Error fetching weather data:', error);
        });
}
