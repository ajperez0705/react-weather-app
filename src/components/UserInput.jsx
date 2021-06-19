import React from "react";

function UserInput({ userInput, setUserInput, submitHandler, errorMessage }) {
  const inputListener = function (e) {
    let input = e.target.value;

    setUserInput(input);
  };

  return (
    <div>
      <form action="">
        <input
          value={userInput}
          onChange={inputListener}
          placeholder="Search a location"
          type="text"
        />
        <button onClick={submitHandler}>Submit</button>
        {errorMessage && <p>{errorMessage.message}</p>}
      </form>
    </div>
  );
}

export default UserInput;
