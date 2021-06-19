import React from "react";

export default async function searchFetch(userInput) {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${userInput}`,
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
    return data;
  } catch (err) {
    console.log(err);
  }
}
