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
    if (started){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
    else{
        alert("Nhấn Start đã chị ơi!!!")
    }

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
    var audio = new Audio(name + ".mp3");
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
        $("#simon-game .container-fluid").addClass("game-over");
        setTimeout(function(){
            $("#simon-game .container-fluid").removeClass("game-over");
        },200)
        $("#level-title").html("Thua không cay cú nha :))))").append('<iframe src="https://giphy.com/embed/Fn7q3cMgPZmqk" width="55" height="55" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
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
