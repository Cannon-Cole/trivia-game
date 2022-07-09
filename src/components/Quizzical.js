import React from "react";
import Question from "./Question";
import Start from "./Start";
import { nanoid } from "nanoid";
import he from "he";

function Quizzical() {
  const states = {
    new: "new",
    playing: "playing",
    finished: "finished",
  };

  const chosen_style = "chosen";
  const error_style = "error";
  const correct_style = "correct";

  const [game_data, set_game_data] = React.useState([]);
  const [question_components, set_questions] = React.useState([]);
  const [game_state, set_game_state] = React.useState(states.new);

  function answer_selected(question, answer) {
    let new_game_data = [];
    for (let i = 0; i < game_data.length; i++) {
      new_game_data.push(game_data[i]);
      if (game_data[i].question === question) {
        new_game_data[i].chosen = answer;
      }
    }

    build_questions();
  }

  function build_questions() {
    console.log(game_data);
    console.log("build");
    let built_questions = [];
    for (let i = 0; i < game_data.length; i++) {
      built_questions.push(
        <Question
          key={game_data[i].key}
          question={game_data[i].question}
          answers={game_data[i].answers}
          correct={game_data[i].correct_answer}
          chosen={game_data[i].chosen}
          game_state={game_state}
          selected_answer={answer_selected}
        />
      );
    }

    set_questions(built_questions);
  }

  function init_questions(data) {
    let build_game_data = [];
    for (let i = 0; i < data.length; i++) {
      let current_game_data = {};
      let current = data[i];
      let answers_length = current.incorrect_answers.length;
      let correct_position = Math.floor(Math.random() * answers_length);
      let question = he.decode(current.question);
      let answers = [];

      for (let j = 0; j < answers_length; j++) {
        if (j === correct_position) {
          let cor_ans = he.decode(current.correct_answer);
          current_game_data.correct_answer = cor_ans;
          answers.push([cor_ans]);
        }
        answers.push(he.decode(current.incorrect_answers[j]));
      }

      current_game_data.key = current.id;
      current_game_data.question = question;
      current_game_data.answers = answers;
      current_game_data.chosen = null;

      build_game_data.push(current_game_data);
    }
    set_game_data(build_game_data);
    build_questions();
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        data = data.results.map((x) => ({ ...x, id: nanoid() }));
        init_questions(data);
      });
  }, []);

  function build_page() {
    if (game_state === states.new) {
      return question_components.push(<Start key={nanoid()} />);
    }
  }

  return <main>{build_page()}</main>;
}

export default Quizzical;
