import React from "react";

function SavedLocation({
  location,
  region,
  country,
  onRemove,
  fetchSavedData,
}) {
  const fetchDataHandler = () => {
    fetchSavedData(location);
  };

  return (
    <div>
      <h6>{location}</h6>
      <button onClick={onRemove} className="remove-location">
        Remove
      </button>
      <button onClick={fetchDataHandler}>render</button>
    </div>
  );
}

export default SavedLocation;
