const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const ProgressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };
      const answerChoice = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoice.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoice.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    setTimeout(() => {
      game.classList.remove("hidden");
      loader.classList.add("hidden");
    }, 5000);

    startGame();
  });
console.log(questions);
//CONSTANTS
const CORRECT_BONUS = 4;
const NEGATIVE_MARKS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTIONS || availableQuestions.length == 0) {
    console.log("saving score in ls");
    localStorage.setItem("mostRecentScore", score);
    window.location.assign("/end.html");
  }
  questionCounter++;
  ProgressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${
    ((questionCounter - 1) / MAX_QUESTIONS) * 100
  }%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) {
      return;
    }
    acceptingAnswers = false;
    console.log(e);
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    console.log(selectedAnswer, currentQuestion.answer);
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.classList.add(classToApply);

    if (classToApply == "correct") {
      score = score + CORRECT_BONUS;
    } else {
      score = score - NEGATIVE_MARKS;
    }
    scoreText.innerText = score;
    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});
