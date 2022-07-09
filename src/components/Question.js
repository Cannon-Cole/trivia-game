function Question(props) {
  let pressed = props.selected_answer;
  let styles = "quiz-button";

  function select_style(answer) {
    console.log(answer, "---", props.correct);
    if (answer === props.chosen && props.game_state === "playing") {
      return " chosen";
    } else if (answer === props.correct && props.game_state === "finished") {
      return " correct";
    } else if (
      answer === props.chosen &&
      answer !== props.correct &&
      props.game_state === "finished"
    ) {
      return " incorrect";
    } else {
      return "";
    }
  }

  return (
    <div>
      <h3>{props.question}</h3>
      <div>
        {props.answers.map((answer) => (
          <button
            key={answer}
            className={"quiz-button" + select_style(answer)}
            onClick={() => pressed(props.question, answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
