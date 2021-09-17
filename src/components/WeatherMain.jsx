import React from "react";
import "./WeatherMain.css";

const WeatherMain = ({ currentWeather }) => {
  // Ref used within the the like button in weathermain
  // submit handler used for the like btn
  // false === not liked
  // true === liked

  return (
    <div>
      <div className="temperature">
        {Math.round(currentWeather.detailOne)}°F
      </div>
      <div className="weather-details">
        <div className="detail detail-two">
          Wind: {currentWeather.detailTwo}
        </div>
        <div className="detail detail-three">
          Condition: {currentWeather.detailFour}
        </div>
        <div className="detail detail-three">
          UV: {currentWeather.detailThree}
        </div>
      </div>
    </div>
  );
};
export default WeatherMain;
