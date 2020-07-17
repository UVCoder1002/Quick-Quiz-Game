const question = document.getElementById(question);
const choices = Array.from(document.getElementsByClassName(choice - text));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question: "Who invented computer",
    choice1: "Bjarne",
    choice2: "Linus Torwald",
    choice3: "Charles Babbage",
    choice4: "James Gosling",
    answer: 3,
  },
];
//CONSTANTS
const CORRECT_BONUS = 4;
const MAX_QUESTIONS = 2;

startgame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
};
