import React, { useContext } from "react";
import SavedListContext from "../store/saved-list-context";

function SavedListButton({ showListHandler }) {
  const listCTX = useContext(SavedListContext);

  //
  const numberOfListItems = listCTX.locations.length;

  return (
    <div>
      <button onClick={showListHandler} className="saved-locations">
        <span>Saved Locations</span>
        <span>{numberOfListItems}</span>
      </button>
    </div>
  );
}

export default SavedListButton;
