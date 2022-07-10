import React from "react";

function StartScreen(props) {
  return <button onClick={() => props.start_game()}>Start Quiz</button>;
}

export default StartScreen;
