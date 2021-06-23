import React, { useContext } from "react";
import SavedListContext from "../store/saved-list-context";
import "../App.css";

function SavedListButton({ showListHandler, savedListStatus }) {
  const listCTX = useContext(SavedListContext);

  //
  const numberOfListItems = listCTX.locations.length;

  return (
    <div>
      <div onClick={showListHandler} className="saved-locations">
        {!savedListStatus && (
          <span className="list-btn">
            <i class="fas fa-bars"></i>
          </span>
        )}
        {!savedListStatus && (
          <span class="num-list-items">{numberOfListItems}</span>
        )}
      </div>
    </div>
  );
}

export default SavedListButton;
