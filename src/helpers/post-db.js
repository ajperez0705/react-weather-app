import React from "react";

export default async function addToDb(locationData) {
  try {
    const response = await fetch(
      `https://react-weather-api-317118-default-rtdb.firebaseio.com/weather-locations.json`,
      {
        method: "POST",
        body: JSON.stringify(locationData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
