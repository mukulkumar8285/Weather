import React from "react";

function Temperature({ temp, unit }) {
  return (
    <p className="temperature">
      {Math.round(temp)}°{unit}
    </p>
  );
}

export default Temperature;
