//Create an array of trivia question objects

var questionObj = { question: "who", ans: ["a", "b", "c", "d"], correctAns: 0 };

var questions = [
  { question: "who", ans: ["a", "b", "c", "d"], correctAns: 0 },
  { question: "who1", ans: ["a", "b", "c", "d"], correctAns: 0 },
  { question: "who2", ans: ["a", "b", "c", "d"], correctAns: 0 },
  { question: "who3", ans: ["a", "b", "c", "d"], correctAns: 0 },
  { question: "who4", ans: ["a", "b", "c", "d"], correctAns: 0 }
];

var qIndex = 0;
var time = 30;
var timerInterval;
//Listen for click on the initial start button, then start the game

$("#startButton").on('click', nextQuestion);

//Use set interval to begin a 30 second timer and display it in the timer element
function startTimer(){
    time = 30;
    timerInterval = setInterval(displayTimer, 1000);
}

function displayTimer(){
    if(time === 0){
        alert("You lost");
        clearInterval(timerInterval);
        nextQuestion();
    }
    $("#timer").text("Time remaining - 00:"+time);
    time -= 1;
    
}

//Display a question from the array. Use a global variable to keep track of place in array
//If the timer runs out, alert, then move to the next problem
function nextQuestion(){
    $("#triviaBody").empty();

    //Create an html element to display the timer
    var timer = $("<div>").text("Time remaining - 00:30");
    timer.attr("id", "timer");
    $("#triviaBody").prepend(timer);
    
    //Get the next question from the global questions array and append it to the triviaBody
    var question = $("<h2>").text(questions[qIndex].question);
    $("#triviaBody").append(question);
    //Pass the array of potential answers along with the correct answer
    buildAnsButtons(questions[qIndex].ans, questions[qIndex].correctAns)
    //Increment the spot in the array
    qIndex++;
    //Start the timer
    startTimer();
    //If the timer runs out, on to the next question
    
}

//Dynamicaly generate buttons for each possible answer and give them a class name: ansButton
//Give button that contain's correct answer a unique id
function buildAnsButtons(answersArr, correctAns){
    answersArr.forEach(function(answer, i){
        var button = $("<button>").text(answer);
        button.addClass("ansButton");
        if(i === correctAns){
            button.attr("id", "correctAns");
        }
        $("#triviaBody").append(button);
    });
    //Add a click listener for the ansButton, and check if that is the correct answer
    $(".ansButton").on('click', checkAnswer);


}

function checkAnswer(){
    if($(this).is("#correctAns")){
        alert("correct!");
    }
    else{
        alert("button clicked");
    }
}