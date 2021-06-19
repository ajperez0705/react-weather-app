import React from "react";

function WeatherMain({
  region,
  country,
  location,
  detailOne,
  detailTwo,
  detailThree,
}) {
  return (
    <div>
      <main className="main">
        <div className="title">
          <div className="title-minor">
            <h6>{region}</h6>
            <h6>{country}</h6>
          </div>
          <div className="title-major">
            <h3>{location}</h3>
          </div>
        </div>
        <div className="details">
          <div className="detail detail-one">Temperature: {detailOne}</div>
          <div className="detail detail-two">Wind: {detailTwo}</div>
          <div className="detail detail-three">UV: {detailThree}</div>
        </div>
      </main>
    </div>
  );
}

export default WeatherMain;
