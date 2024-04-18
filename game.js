var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var numberOfButtons = document.querySelectorAll(".btn").length;

var level = 0;
var started = false;

//trigger start ng game
document.addEventListener("keypress", function () {
    if (started === false) {
        nextSequence();
        started = true;
    }
});

//animation at sounds sa buttons
for(var i = 0; i < numberOfButtons; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
        var buttonPressed = this.id;
        userClickedPattern.push(buttonPressed);

        playSound(buttonPressed);
        buttonAnimation(buttonPressed);

        checkAnswer(userClickedPattern.length-1);
    });
}


//susunod na pattern
function nextSequence () {
    var randomNumber = Math.floor(Math.random(0) * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;
    document.querySelector("h1").textContent = "Level " + level;

    playSound(randomChosenColor);
    fadeAnimation(randomChosenColor);
}

//sounds
function playSound (buttonClass) {
    switch(buttonClass){
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play()
        break;

        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play()
        break;

        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play()
        break;

        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play()
        break;
    }
}

//press animation
function buttonAnimation (buttonPressed) {
    var pressedButton = document.querySelector("." + buttonPressed);
    pressedButton.classList.add("pressed");

    setTimeout(function () {
        pressedButton.classList.remove("pressed");
    }, 100);
}

//fade animation
function fadeAnimation (buttonChose) {
    var fadeButton = document.querySelector("." + buttonChose);
    fadeButton.classList.add("fade");

    setTimeout(function () {
        fadeButton.classList.remove("fade");
    }, 400);
}

function checkAnswer (currentLevel) { 
    //para macheck kung tama ung latest na saggot
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //para macheck kung tama ung pattern
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
                //buburahin ung pattern na cinlick ng user tapos gagawa ng panibago tapos ikukumpara ung bago sa gamePattern
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart";
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        startOver();
    }
}

function startOver () {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}