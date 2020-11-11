const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answersDiv = document.querySelector("#answers");
const displayTimer = document.querySelector("#time");
const timerbar = document.querySelector("#timer");
const initialInput = document.querySelector(".high-score-container");
const submitBtn = document.querySelector("#init-submit");
const bigScore = document.querySelector("#big-score");
const userName = document.querySelector("#highScore");
const scoreBoard = document.querySelector(".score-board");
const playAgain = document.querySelector("#play-again");
const questions = [
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
  {
    text: "question?",
    answers: ["answer 1", "answer 2", "answer 3"],
    correctIndex: 0,
  },
];
// this lets the program know what questions its on display
let questionIndex = 0;
if (startBtn) {
  // this is the very start of the test and will handle the start of the timer/interval
  startBtn.addEventListener("click", handleStartClick);
}
if (answersDiv) {
  // this checks what answer the user has selected and checks it against the "correctIndex" of each question
  answersDiv.addEventListener("click", handleAnswerClick);
}
if (submitBtn) {
  // this button will check for user input and store it to a new value before moving to "highscore.html" and placing it on the screen
  submitBtn.addEventListener("click", finalScore);
}
if (playAgain) {
  // this is the event listener for the "play again" buttons to restart the quiz.
  playAgain.addEventListener("click", playAgainClick);
}
// this is the value for the time left, I made it global so i can manipulate it when someone gets a wrong answer.
let timeLeft = 100;
let timerOn = true;

function playAgainClick(e) {
  e.preventDefault();
  window.location.replace("index.html");
  startPrompt.style.display = "block";
  questionContainer.style.display = "none";
  timerOn = true;
}
function handleStartClick() {
  startPrompt.style.display = "none";
  questionContainer.style.display = "block";
  renderQuestion();
  Timer();
}
function handleAnswerClick(e) {
  e.preventDefault();
  if (!e.target.matches("button")) return;
  const question = questions[questionIndex];
  const correctAnswer = question.answers[question.correctIndex];
  const userAnswer = e.target.textContent;
  if (userAnswer === correctAnswer) {
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    } else {
    }
  }
  questionIndex++;
  //   this will see if we're at the end of the questions array and if so run the "testOver" function
  if (questionIndex == questions.length) {
    testOver();
  } else {
    renderQuestion();
  }
}
function renderQuestion() {
  const currentQuestion = questions[questionIndex];
  questionText.textContent = currentQuestion.text;
  answersDiv.innerHTML = "";
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const answer = currentQuestion.answers[i];
    const btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-primary");
    btn.textContent = answer;
    answersDiv.appendChild(btn);
  }
}
function Timer() {
  let timeInterval = setInterval(function () {
    displayTimer.textContent = timeLeft;
    if (timerOn) {
      timeLeft--;
    }
    if (timeLeft <= 0 || !timerOn) {
      clearInterval(timeInterval);
    }
  }, 1000);
}
function testOver() {
  questionContainer.style.display = "none";
  displayTimer.style.display = "none";
  initialInput.style.display = "block";
  timerbar.style.display = "none";
  bigScore.textContent = timeLeft;
  timerOn = false;
}
function finalScore(event) {
  event.preventDefault();

  // stringify my score
  const scoreTotal = JSON.stringify(timeLeft);

  //   take "scoreTotal" and set it's key and value in local storage
  localStorage.setItem("finalScore", scoreTotal);

  //   grab my user input/user name and assign it to "userInput"
  const userInput = userName.value.trim();

  //   stringify "userInput" and store it inside "finalName"
  const finalName = JSON.stringify(userInput);

  //   take "finalName" and set it's key and value in local storage
  localStorage.setItem("userName", finalName);

  // This has to redirect the page before trying to render any local stoarage data
  window.location.replace("highscore.html");

  //   this function is invoked here to output the users score and initials to the highscore.html
  //   renderScoreBoard();
}

function renderScoreBoard() {
  let storedScore = localStorage.getItem("finalScore");
  let storedName = localStorage.getItem("userName");

  let userScore = JSON.parse(storedScore);

  let userInitials = JSON.parse(storedName);

  console.log(storedScore);
  console.log(storedName);

  var score = document.createElement("h2");
  score.textContent = userInitials + ": " + userScore;
  scoreBoard.prepend(score);
}
