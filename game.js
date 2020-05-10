var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$("h1.welcome-heading").fadeOut(500).fadeIn(2000);
$(".start-btn").click(function() {
    if (!started) {
        nextSequence();
        started = true;
        animatePress(userChosenColour);
    }
})
$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
    }
})
$(".btn2").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]){
        console.log("wrong");
        startOver();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Start A New Game.");
        playSound("wrong");
    }
    else {
        if ((currentLevel + 1) === level){
            setTimeout(nextSequence, 1000);
        }
        console.log("correct");
    }

}
function startOver() {
     started = false;
     level = 0;
     gamePattern = [];
}
