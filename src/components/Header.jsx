import React, { useState, useEffect, useContext } from "react";
import SavedListContext from "../store/saved-list-context";
import addToDb from "../helpers/post-db";
import SavedListButton from "./SavedListButton";
import SavedLocations from "./SavedLocations";
import UserInput from "./UserInput";

function Header({
  onHideHandler,
  onFetchSavedHandler,
  showListHandler,
  savedListStatus,
  //   errorMessage,
  userInput,
  setUserInput,
  submitHandler,
  currentWeather,
}) {
  const savedCtx = useContext(SavedListContext);
  const locationId = Math.random().toString();
  const [likedState, setLikedState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  let isInitial = true;

  useEffect(() => {
    // if (isInitial === true) {
    //   isInitial = false;
    //   return;
    // }
    setErrorMessage(false);
    setLikedState(false);
  }, [currentWeather]);

  const likeBtnHandler = (e) => {
    e.preventDefault();

    for (let i = 0; i < savedCtx.locations.length; i++) {
      if (savedCtx.locations[i].location === currentWeather.location) {
        setErrorMessage(true);
        return;
      }
    }

    savedCtx.addLocation({
      id: locationId,
      location: currentWeather.location,
      region: currentWeather.region,
      country: currentWeather.country,
      temperature: currentWeather.detailOne,
    });

    addToDb({
      location: currentWeather.location,
      region: currentWeather.region,
      country: currentWeather.country,
      temperature: currentWeather.detailOne,
    });
    setLikedState(true);
  };
  /**************************** */

  return (
    <div className="header">
      <div className="title">
        <div className="title-minor">
          <span>{currentWeather.region},</span>
          <span>{currentWeather.country}</span>
        </div>
        <div className="title-major">
          <h3>{currentWeather.location}</h3>
        </div>
      </div>
      <div className="nav-bar">
        <div className="nav-links">
          {savedListStatus && (
            <SavedLocations
              onHideHandler={onHideHandler}
              onFetchSavedHandler={onFetchSavedHandler}
            />
          )}
          <SavedListButton
            showListHandler={showListHandler}
            savedListStatus={savedListStatus}
          />
          <UserInput
            errorMessage={errorMessage}
            userInput={userInput}
            setUserInput={setUserInput}
            submitHandler={submitHandler}
          />
          <button onClick={likeBtnHandler} className="like-btn">
            <i class={likedState ? "fas fa-heart" : "far fa-heart"}></i>
          </button>
          {errorMessage && <p>You have already liked this location</p>}
        </div>
      </div>
    </div>
  );
}

export default Header;
