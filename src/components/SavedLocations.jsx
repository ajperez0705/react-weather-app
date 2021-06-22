import React from "react";
import Modal from "./Modal";
import { useState, useContext, useEffect } from "react";
import SavedListContext from "../store/saved-list-context";
import SavedLocation from "./SavedLocation";

function SavedLocations({ onHideHandler, onFetchSavedHandler }) {
  const savedListCtx = useContext(SavedListContext);
  const hasItems = savedListCtx.locations.length > 0;

  const removeLocationHandler = (id) => {
    savedListCtx.removeLocation(id);
  };

  // Dummy Saved List
  const savedLocations = (
    <ul>
      {savedListCtx.locations.map((savedLocation) => (
        <SavedLocation
          key={savedLocation.id}
          location={savedLocation.location}
          region={savedLocation.region}
          country={savedLocation.country}
          onRemove={removeLocationHandler.bind(null, savedLocation.id)}
          fetchSavedData={onFetchSavedHandler}
        />
      ))}
    </ul>
  );

  // State Management
  // const [errorMessage, setErrorMessage] = useState();

  return (
    <Modal>
      {/* {errorMessage && <div>{errorMessage.message}</div>} */}
      {savedLocations}
      {!hasItems && <p>No Locations</p>}
      <button onClick={onHideHandler} className="hide-modal">
        Hide
      </button>
    </Modal>
  );
}

export default SavedLocations;
