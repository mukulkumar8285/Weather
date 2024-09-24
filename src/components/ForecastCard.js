import React from "react";

const ForecastCard = ({ day, tempHigh, tempLow, icon }) => {
  return (
    <div className="forecast-card">
      <p>{day}</p>
      <p>High: {tempHigh}°</p>
      <p>Low: {tempLow}°</p>
      <img src={icon} alt="weather icon" />
    </div>
  );
};

export default ForecastCard;
