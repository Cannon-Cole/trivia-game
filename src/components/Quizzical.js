import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import he from "he";

function Quizzical() {
  const states = {
    new: "new",
    playing: "playing",
    finsihed: "finished",
  };

  const [questions, set_questions] = React.useState([]);
  const [game_state, set_game_state] = React.useState(states.new);

  function answer_selected(question, answer) {
    console.log("Pressed");
  }

  function build_questions(data) {
    let built_questions = [];
    for (let i = 0; i < data.length; i++) {
      let current = data[i];
      let answers_length = current.incorrect_answers.length;
      let correct_position = Math.floor(Math.random() * answers_length);
      let answers = [];
      for (let j = 0; j < answers_length; j++) {
        if (j === correct_position) {
          answers.push(he.decode(current.correct_answer));
        }
        answers.push(he.decode(current.incorrect_answers[j]));
      }

      built_questions.push(
        <Question
          key={current.id}
          question={he.decode(current.question)}
          answers={answers}
          selected_answer={answer_selected}
        />
      );
    }

    set_questions(built_questions);
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        data = data.results.map((x) => ({ ...x, id: nanoid() }));
        build_questions(data);
      });
  }, []);

  return <main>{questions}</main>;
}

export default Quizzical;
