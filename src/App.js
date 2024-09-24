import React, { useEffect, useState } from "react";
import axios from "axios";
import CityName from "./components/CityName";
import Temperature from "./components/Temperature";
import WeatherCondition from "./components/WeatherCondition";
import WeatherIcon from "./components/WeatherIcon";
import SearchCity from "./components/SearchCity";
import TempToggle from "./components/TempToggle";
import Forecast from "./components/Forecast";
import "./App.css"

const API_KEY = "fbc51917a5c6c49751cf2fa35cc931a2";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");

  // Fetch weather data on city or unit change
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit === "C" ? "metric" : "imperial"}`
      );
      setWeather(response.data);
      setError("");
      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError("City not found or network error");
      setWeather(null);
    }
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <div className="weather-app">
      <SearchCity onSearch={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <>
          <CityName city={weather.name} />
          <Temperature temp={weather.main.temp} unit={unit} />
          <WeatherCondition condition={weather.weather[0].description} />
          <WeatherIcon icon={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <TempToggle unit={unit} onToggle={toggleUnit} />
          <Forecast city={city} unit={unit} />
        </>
      )}
    </div>
  );
}

export default App;
