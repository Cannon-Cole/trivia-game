import React from "react";
import Question from "./Question";
import StartScreen from "./StartScreen";
import { nanoid } from "nanoid";
import he from "he";

function Quizzical() {
  const states = {
    new: "new",
    playing: "playing",
    finished: "finished",
  };

  const [game_data, set_game_data] = React.useState([]);
  const [question_components, set_questions] = React.useState([]);
  const [game_state, set_game_state] = React.useState(states.new);

  function fetch_data() {
    console.log("fetching");
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        data = data.results.map((x) => ({ ...x, id: nanoid() }));
        init_questions(data);
        set_game_state(states.playing);
      });
  }

  function answer_selected(question, answer) {
    let new_game_data = [];
    for (let i = 0; i < game_data.length; i++) {
      new_game_data.push(game_data[i]);
      if (game_data[i].question === question) {
        //console.log(answer);
        new_game_data[i].chosen = answer;
      }
    }
    set_game_data(new_game_data);
  }

  React.useEffect(() => {
    console.log("building");
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
  }, [game_data, game_state]);

  function init_questions(data) {
    console.log("initializing");
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
          answers.push(cor_ans);
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
  }

  function start_game() {
    fetch_data();
  }

  function score() {
    set_game_state(states.finished);
  }

  function get_num_correct() {
    let number_of_correct_answers = 0;
    for (let i = 0; i < game_data.length; i++) {
      console.log(game_data[i].chosen, "===", game_data[i].correct_answer);
      if (game_data[i].chosen === game_data[i].correct_answer) {
        number_of_correct_answers += 1;
      }
    }
    return number_of_correct_answers;
  }

  return (
    <main>
      {console.log(question_components)}
      {game_state === states.new ? (
        <StartScreen start_game={start_game} />
      ) : null}
      {game_state !== states.new ? question_components : null}
      {game_state === states.playing ? (
        <button onClick={() => score()}>Score</button>
      ) : null}
      {game_state === states.finished ? (
        <div>
          <p>
            You scored {get_num_correct()} out of {game_data.length}
          </p>
          <button onClick={() => start_game()}>Play Again</button>
        </div>
      ) : null}
    </main>
  );
}

export default Quizzical;
