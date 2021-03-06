import SavedListContext from "./saved-list-context";
import { useReducer } from "react";

const defaultSavedListState = {
  locations: [],
};

const savedListReducer = (state, action) => {
  // Adding a location
  if (action.type === "ADD_LOCATION") {
    const updatedLocations = state.locations.concat(action.location);
    return {
      locations: updatedLocations,
    };
  }

  // Removing a location
  if (action.type === "REMOVE_LOCATION") {
    let updatedLocations = state.locations.filter(
      (location) => location.id !== action.id
    );
    return {
      locations: updatedLocations,
    };
  }

  // return defaultSavedListState;
};

const SavedListProvider = (props) => {
  const [saveListState, dispatchSaveListAction] = useReducer(
    savedListReducer,
    defaultSavedListState
  );

  const addLocationHandler = function (location) {
    dispatchSaveListAction({ type: "ADD_LOCATION", location: location });
  };

  const removeLocationHandler = function (id) {
    dispatchSaveListAction({ type: "REMOVE_LOCATION", id: id });
  };

  const savedListContext = {
    locations: saveListState.locations,
    addLocation: addLocationHandler,
    removeLocation: removeLocationHandler,
  };

  return (
    <SavedListContext.Provider value={savedListContext}>
      {props.children}
    </SavedListContext.Provider>
  );
};

export default SavedListProvider;
