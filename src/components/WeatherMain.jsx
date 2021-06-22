import React, { useState, useEffect, useContext } from "react";
import SavedListContext from "../store/saved-list-context";
import addToDb from "../helpers/post-db";
import "./WeatherMain.css";

const WeatherMain = ({
  region,
  country,
  location,
  detailOne,
  detailTwo,
  detailThree,
  background,
}) => {
  const savedCtx = useContext(SavedListContext);
  const locationId = Math.random().toString();
  const [likedState, setLikedState] = useState(false);

  // Ref used within the the like button in weathermain
  // submit handler used for the like btn
  // false === not liked
  // true === liked

  const likeBtnHandler = (e) => {
    e.preventDefault();

    for (let i = 0; i < savedCtx.locations.length; i++) {
      if (savedCtx.locations[i].location === location) {
        setLikedState(true);
        return;
      }
    }

    savedCtx.addLocation({
      id: locationId,
      location: location,
      region: region,
      country: country,
    });

    addToDb({ location: location, region: region, country: country });
  };
  /**************************** */

  useEffect(() => {
    setLikedState(false);
  }, []);

  return (
    <div>
      <button onClick={likeBtnHandler} className="like">
        Favorite this Location
      </button>
      {likedState && <p>You have already liked this location</p>}
      <main id={locationId} className={background(Math.round(detailOne))}>
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
          <div className="detail detail-one">
            Temperature: {Math.round(detailOne)}°F
          </div>
          <div className="detail detail-two">Wind: {detailTwo}</div>
          <div className="detail detail-three">UV: {detailThree}</div>
        </div>
      </main>
    </div>
  );
};
export default WeatherMain;
