import React from "react";

function StartScreen(props) {
  return (
    <div className="vertical center middle">
      <h1>Quizzical</h1>
      <button className="utility-button" onClick={() => props.start_game()}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
