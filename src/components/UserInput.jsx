import React from "react";

function UserInput({ userInput, setUserInput, submitHandler }) {
  const inputListener = function (e) {
    let input = e.target.value;

    setUserInput(input);
  };

  return (
    <div>
      <li className="nav-link">Search</li>
      <form onChange={inputListener} action="">
        <input placeholder="Search a location" type="text" />
        <button onClick={submitHandler}>Submit</button>
      </form>
    </div>
  );
}

export default UserInput;
