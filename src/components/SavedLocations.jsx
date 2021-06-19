import React from "react";
import Modal from "./Modal";
import { useState } from "react";

function SavedLocations({ onHideHandler }) {
  // Dummy Saved List
  const test_cart_items = (
    <ul>
      {[
        { id: "1", region: "Tri-State", country: "USA", location: "Orlando" },
        { id: "2", region: "Tri-State", country: "USA", location: "Atlanta" },
      ].map((savedLocation) => (
        <li key={savedLocation.id}>{savedLocation.location}</li>
      ))}
    </ul>
  );

  // State Management
  const [errorMessage, setErrorMessage] = useState({
    message: "Cart is empty",
  });
  const [emptyCart, setEmptyCart] = useState(true);

  const savedLocationError = function () {
    setErrorMessage({
      message: "no saved locations",
    });
  };

  return (
    <Modal>
      {emptyCart && <div>{errorMessage.message}</div>}
      {test_cart_items}
      <button onClick={onHideHandler} className="hide-modal">
        Hide
      </button>
    </Modal>
  );
}

export default SavedLocations;
