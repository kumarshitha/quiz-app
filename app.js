
const questions = [
  {
    question: "Which language is used to structure a web page?",
    answers: ["CSS", "HTML", "Python", "Java"],
    correct: "HTML"
  },
  {
    question: "Which language is used to style a web page?",
    answers: ["HTML", "CSS", "C++", "SQL"],
    correct: "CSS"
  },
  {
    question: "Which language adds interactivity to a web page?",
    answers: ["JavaScript", "HTML", "CSS", "XML"],
    correct: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("score");

function showQuestion() {
  answered = false;

  const item = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = item.question;
  answersDiv.replaceChildren();
  feedback.textContent = "";
  scoreText.textContent = "";

  item.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => checkAnswer(answer, button));

    answersDiv.append(button);
  });
}

function checkAnswer(selectedAnswer) {
  if (answered) return;

  answered = true;

  const correctAnswer = questions[currentQuestion].correct;

  if (selectedAnswer === correctAnswer) {
    score++;
    feedback.textContent = "Correct!";
    feedback.className = "correct";
  } else {
    feedback.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
    feedback.className = "incorrect";
  }

  const buttons = answersDiv.querySelectorAll("button");
  buttons.forEach(button => {
    button.disabled = true;
  });

  const nextButton = document.createElement("button");
  nextButton.textContent =
    currentQuestion === questions.length - 1 ? "Show Result" : "Next Question";

  nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  answersDiv.append(nextButton);
}

function showResult() {
  questionNumber.textContent = "Quiz Completed!";
  questionText.textContent = "Your Final Score";
  answersDiv.replaceChildren();
  feedback.textContent = "";
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
}

showQuestion();
