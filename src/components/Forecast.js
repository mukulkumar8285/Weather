import React, { useEffect, useState } from "react";
import axios from "axios";
import ForecastCard from "./ForecastCard";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const Forecast = ({ city, unit }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchForecast(city);
  }, [city, unit]);

  const fetchForecast = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit === "C" ? "metric" : "imperial"}`
      );
      setForecast(response.data.list.filter((_, index) => index % 8 === 0)); // Get daily data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <ForecastCard
          key={index}
          day={new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}
          tempHigh={day.main.temp_max}
          tempLow={day.main.temp_min}
          icon={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        />
      ))}
    </div>
  );
};

export default Forecast;
