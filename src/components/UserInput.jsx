import React from "react";
import "../App.css";

function UserInput({ userInput, setUserInput, submitHandler, errorMessage }) {
  const inputListener = function (e) {
    let input = e.target.value;

    setUserInput(input);
  };

  return (
    <div>
      <form className="user-input" action="">
        <input
          className="user-input-field"
          value={userInput}
          onChange={inputListener}
          placeholder="Search a location"
          type="text"
        />
        <button className="search-btn" onClick={submitHandler}>
          Submit
        </button>
        {errorMessage && <p>{errorMessage.message}</p>}
      </form>
    </div>
  );
}

export default UserInput;
