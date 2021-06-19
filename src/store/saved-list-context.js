import React from "react";

const SavedListContext = React.createContext({
  locations: [],
  addLocation: (location) => {},
  removeLocation: (id) => {},
});
export default SavedListContext;
