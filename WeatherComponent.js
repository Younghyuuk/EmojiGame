import React, { useState, useEffect } from 'react';

const API_KEY = 'b6PoRm9bvkCBMlhlvoP7OVraQCsTtu2p';
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Failed to fetch weather data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div>
      <h2>Weather Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter city name:
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          {/* Add more weather information as needed */}
        </div>
      ) : (
        <p>Enter a city name to get weather information.</p>
      )}
    </div>
  );
}

export default WeatherComponent;