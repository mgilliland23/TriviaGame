//Create a global array of trivia question objects
var questions = [
  {
    question:
      "In Mordor, what kind of food does Frodo say he can't remember the taste of?",
    ans: ["cheese", "bacon", "strawberries", "chocolate"],
    correctAns: 2
  },
  {
    question:
      "Who became King of Rohan after Theoden met his demise in battle?",
    ans: ["Eowyn", "Eomer", "Grima", "Eorl"],
    correctAns: 1
  },
  {
    question:
      "Of the following foods, which are hobbits most passionate about?",
    ans: ["mushrooms", "wine", "cheese", "danish"],
    correctAns: 0
  },
  {
    question: "How many wizards are there in Middle Earth?",
    ans: ["2", "1", "4", "5"],
    correctAns: 3
  },
  {
    question:
      "Who rides ahead with Frodo to Rivendell after he is hit at Weathertop?",
    ans: ["Aaragon", "Arwen", "Gandalf", "Samwise"],
    correctAns: 1
  }
];

var qIndex = 0;
var correctCount = 0;
var incorrectCount = 0;
var time = 30;
var timerInterval;
//Listen for click on the initial start button, then start the game

$("#startButton").on("click", nextQuestion);

//Use set interval to begin a 30 second timer and display it in the timer element
function startTimer() {
  clearInterval(timerInterval);
  time = 30;
  timerInterval = setInterval(displayTimer, 1000);
}

function displayTimer() {
  if (time === 0) {
    alert("Times Up!");
    incorrectCount += 1;
    nextQuestion();
  }
  $("#timer").text("Time remaining - 00:" + time);
  time -= 1;
}

//Display a question from the array. Use a global variable to keep track of place in array
//If the timer runs out, alert, then move to the next problem
function nextQuestion() {
  $("#triviaBody").empty();
  //Make sure there are more questions
  if (!checkIfGameOver()) {
    //Create an html element to display the timer
    var timer = $("<div>").text("Time remaining - 00:30");
    timer.attr("id", "timer");
    $("#triviaBody").prepend(timer);

    //Get the next question from the global questions array and append it to the triviaBody
    var question = $("<h2>").text(questions[qIndex].question);
    $("#triviaBody").append(question);
    //Pass the array of potential answers along with the correct answer
    buildAnsButtons(questions[qIndex].ans, questions[qIndex].correctAns);
    //Increment the spot in the array of trivia questions
    qIndex++;
    //Start the timer
    startTimer();
  }
}

//Dynamicaly generate buttons for each possible answer and give them a class name: ansButton
//Give button that contain's correct answer a unique id
function buildAnsButtons(answersArr, correctAns) {
  answersArr.forEach(function (answer, i) {
    var button = $("<button>").text(answer);
    button.addClass("ansButton");
    if (i === correctAns) {
      button.attr("id", "correctAns");
    }
    $("#triviaBody").append(button);
  });
  //Add a click listener for the ansButton, and check if that is the correct answer
  $(".ansButton").on("click", checkAnswer);
}

//Check if the user's answer is the correct answer
function checkAnswer() {
  if ($(this).is("#correctAns")) {
    alert("Correct!");
    correctCount += 1;
    nextQuestion();
  } else {
    alert("Wrong!");
    incorrectCount += 1;
    nextQuestion();
  }
}

//Check if end of the game
function checkIfGameOver() {
  if (qIndex === questions.length) {
    var endGameMessage = $("<div>");
    endGameMessage.append("<h2>Game over!</h2>");
    endGameMessage.append("<h2>You got " + correctCount + " questions correct</h2>");
    endGameMessage.append("<h2>You got " + incorrectCount + " questions incorrect</h2>");
    var restartButton = $("<button>").attr("id", "startButton");
    restartButton.text("Click here to play again");
    restartButton.bind("click", nextQuestion);

    $(triviaBody).append(endGameMessage);
    $(triviaBody).append(restartButton);

    qIndex = 0;
    correctCount = 0;
    incorrectCount = 0;

    clearInterval(timerInterval);

    return true;
  }
  else {
    return false;
  }
}
