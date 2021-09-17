import WeatherMain from "./components/WeatherMain";
import { useState, useEffect } from "react";
import searchFetch from "./helpers/search-fetch";
import SavedListProvider from "./store/SavedListProvider";

// Styling
import "./main.css";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [savedListIsShown, setSavedListIsShown] = useState(false);

  async function fetchWeather(currentPosition) {
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
      console.log(data);

      setCurrentWeather({
        region: data.location.region,
        country: data.location.country,
        location: data.location.name,
        detailOne: data.current.feelslike_f,
        detailTwo: data.current.gust_mph,
        detailThree: data.current.uv,
        detailFour: data.current.condition.text,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const getCurCoords = () => {
    navigator.geolocation.getCurrentPosition(fetchWeather);
  };

  useEffect(() => {
    getCurCoords();
  }, []);

  const onSubmitHandler = async function (e) {
    e.preventDefault();

    if (userInput.length === 0 || userInput.length < 3) {
      // should also add a guard clause against a letter repeated more than 2 times
      errorHandler();
      return;
    }

    // Reset state to recreate using searched city
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
      detailFour: data.current.condition.text,
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
      detailFour: data.current.condition.text,
    });

    setSavedListIsShown(false);
  };

  const backgroundSetter = function (temperature) {
    let background;
    if (temperature > 85) {
      return (background = "main warm-background");
    } else if (temperature < 85 && temperature > 50) {
      return (background = "main fair-background");
    } else if (temperature < 49) {
      return (background = "main cold-background");
    } else return (background = "main");
  };

  return (
    <SavedListProvider>
      <div className="container">
        <div className={backgroundSetter(currentWeather.detailOne)}>
          <div className="app-overlay" />
          <main>
            <Header
              onHideHandler={hideListHandler}
              onFetchSavedHandler={fetchSavedData}
              showListHandler={showListHandler}
              savedListStatus={savedListIsShown}
              // errorMessage={error}
              userInput={userInput}
              setUserInput={setUserInput}
              submitHandler={onSubmitHandler}
              currentWeather={currentWeather}
            />
            <WeatherMain currentWeather={currentWeather} />
          </main>
        </div>
      </div>
    </SavedListProvider>
  );
}

export default App;
