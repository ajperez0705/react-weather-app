import WeatherMain from "./components/WeatherMain";
import "./main.css";

import { useState, useEffect, useRef } from "react";
import UserInput from "./components/UserInput";
import searchFetch from "./helpers/search-fetch";
import Modal from "./components/Modal";
import SavedLocations from "./components/SavedLocations";
import SavedListProvider from "./store/SavedListProvider";
import SavedListButton from "./components/SavedListButton";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [savedListIsShown, setSavedListIsShown] = useState(false);

  async function fetchWeather2(currentPosition) {
    try {
      const { latitude, longitude } = currentPosition.coords;

      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C${longitude}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "f5bc741242msh471e23f8f0cfff9p148d3fjsn728fd5b4e0b4",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setCurrentWeather({
        region: data.location.region,
        country: data.location.country,
        location: data.location.name,
        detailOne: data.current.feelslike_f,
        detailTwo: data.current.gust_mph,
        detailThree: data.current.uv,
      });
    } catch (err) {
      console.log(err);
    }
  }
  const getCurCoords = () => {
    navigator.geolocation.getCurrentPosition(fetchWeather2);
  };

  useEffect(() => {
    getCurCoords();
  }, []);

  const fetchWeather = async function () {
    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=48.8567%2C2.3508`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "f5bc741242msh471e23f8f0cfff9p148d3fjsn728fd5b4e0b4",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setCurrentWeather({
        region: data.location.region,
        country: data.location.country,
        location: data.location.name,
        detailOne: data.current.feelslike_f,
        detailTwo: data.current.gust_mph,
        detailThree: data.current.uv,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setWeather = function (e) {
    e.preventDefault();
    fetchWeather();
    console.log(currentWeather);
  };

  const onSubmitHandler = async function (e) {
    e.preventDefault();

    if (userInput.length === 0 || userInput.length < 3) {
      errorHandler();
      return;
    }

    setError("");
    setCurrentWeather({});

    const data = await searchFetch(userInput);
    console.log(data);
    setCurrentWeather({
      region: data.location.region,
      country: data.location.country,
      location: data.location.name,
      detailOne: data.current.feelslike_f,
      detailTwo: data.current.gust_mph,
      detailThree: data.current.uv,
    });

    setUserInput("");
  };

  const errorHandler = function () {
    setError({
      title: "jioewjfiowesj",
      message: "hrfgiorwegf",
    });
    return;
  };

  // Saved Location Controls
  const showListHandler = () => {
    setSavedListIsShown(true);
  };

  const hideListHandler = () => {
    setSavedListIsShown(false);
  };

  // Fetch Saved Data and render to weatherMain
  const fetchSavedData = async function (location) {
    if (currentWeather.location === location) return;

    const data = await searchFetch(location);
    setCurrentWeather({
      region: data.location.region,
      country: data.location.country,
      location: data.location.name,
      detailOne: data.current.feelslike_f,
      detailTwo: data.current.gust_mph,
      detailThree: data.current.uv,
    });

    setSavedListIsShown(false);
  };

  return (
    <SavedListProvider>
      {savedListIsShown && (
        <SavedLocations
          onHideHandler={hideListHandler}
          onFetchSavedHandler={fetchSavedData}
        />
      )}
      <div className="app-wrapper">
        <div className="nav-bar">
          <div className="nav-links">
            <SavedListButton showListHandler={showListHandler} />
            <UserInput
              errorMessage={error}
              userInput={userInput}
              setUserInput={setUserInput}
              submitHandler={onSubmitHandler}
            />
          </div>
        </div>
        <WeatherMain
          region={currentWeather.region}
          country={currentWeather.country}
          location={currentWeather.location}
          detailOne={currentWeather.detailOne}
          detailTwo={currentWeather.detailTwo}
          detailThree={currentWeather.detailThree}
        />
        <button onClick={setWeather}>set weather</button>
      </div>
    </SavedListProvider>
  );
}

export default App;
