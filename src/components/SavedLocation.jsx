import React from "react";

// Styling
import "../App.css";

function SavedLocation({
  location,
  region,
  country,
  temperature,
  onRemove,
  fetchSavedData,
}) {
  const curTemp = {
    temperature: temperature,
  };

  const fetchDataHandler = () => {
    fetchSavedData(location);
  };

  const cardBackgroundSetter = function (temperature) {
    console.log(temperature);
    let background;
    if (temperature > 85) {
      return (background = "warm-background");
    } else if (temperature < 85 && temperature > 50) {
      return (background = "fair-background");
    } else if (temperature < 49) {
      return (background = "cold-background");
    } else return (background = "main");
  };

  return (
    <div className={` "location-card ${cardBackgroundSetter(curTemp)}"`}>
      <div className="saved-location-info">
        <h6>
          {region}, {country}
        </h6>
        <h3>{location}</h3>
      </div>
      <div className="saved-location-controls">
        <button onClick={fetchDataHandler} className="render-btn btn">
          Render
        </button>
        <button onClick={onRemove} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
}

export default SavedLocation;
