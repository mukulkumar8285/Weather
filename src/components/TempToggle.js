import React from "react";

function TempToggle({ unit, onToggle }) {
  return (
    <button onClick={onToggle} className="toggle-button">
      Show in {unit === "C" ? "Fahrenheit" : "Celsius"}
    </button>
  );
}

export default TempToggle;
