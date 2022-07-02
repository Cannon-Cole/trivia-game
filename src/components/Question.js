function Question(props) {
  let chosen = props.selected_answer;
  return (
    <div>
      <h3>{props.question}</h3>
      <div>
        {props.answers.map((answer) => (
          <button key={answer} onClick={() => chosen(props.question, answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
