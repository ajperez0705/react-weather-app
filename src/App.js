import "./main.css";

function App() {
  // Gets the current location
  const getCurCoords = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      return position.coords.latitude;
      // return [position.coords.latitude, position.coords.longitude];
    });
  };

  // Fetch weather data according to coords above
  async function fetchWeather(lat) {
    try {
      /******************* Can't get this return value***********************/
      const lat = getCurCoords();
      console.log(lat);
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=28%2C-81.4747604`,
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
    } catch (err) {
      console.error(err);
    }
  }

  fetchWeather();

  // const test = async function () {
  //   try {
  //     let latitude = getCurCoords();
  //     console.log(latitude);
  //     setTimeout(() => {
  //       fetchWeather(latitude);
  //     }, 5000);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="nav-bar">
          <ul className="nav-links">
            <li className="nav-link">Favorite</li>
            <li className="nav-link">List</li>
            <li className="nav-link">Search</li>
          </ul>
        </div>
        <main className="main">
          <div className="title">
            <h6 className="minor">City</h6>
            <h3 className="major">Country</h3>
          </div>
          <div className="details">
            <div className="detail detail-one">Detail 1</div>
            <div className="detail detail-two">Detail 2</div>
            <div className="detail detail-three">Detail 3</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
