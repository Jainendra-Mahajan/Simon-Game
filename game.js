var buttonColors = ["red", "blue", "green", "yellow"]; // we have four colors in game


var gamePattern = []; // store the game pattern 
var userChosenPattern = []; // stores the user's pattern 

var level = 0;
var gameStarted = false;

    $(document).keypress(function(){
    if(!gameStarted){

        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
    });
    
   $(".btn").click(function(){
        var userChosenColor = $(this).attr("id"); // use this keyword to get reference to clicked item  
        userChosenPattern.push(userChosenColor);// attr used to refer and store the val.
        playSound(userChosenColor);
        animateBackground(userChosenColor); // animates background for sometime

        // Check users pattern pass the length of array;
        //as user clicks it will check at current length of array
        //as we checked earlier the previous values.
        checkPattern(userChosenPattern.length - 1);
   });

   function checkPattern(currentLength){
        if(gamePattern[currentLength] === userChosenPattern[currentLength]){
            
            if(gamePattern.length === userChosenPattern.length){

                setTimeout(function(){
                    nextSequence();
                }, 1000); 
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");

            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            startOver();
        }
   }

function nextSequence(){

    //empty user's Prev data 
    userChosenPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

   $("#"+ randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChoosenColor); // plays sound when user pressed button
}

function playSound(sound){ // function Used to play sound
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animateBackground(buttonColor){
    $("#" + buttonColor).addClass("pressed");

    setTimeout(function(){
        $("#" + buttonColor).removeClass("pressed");
    } , 100);
}

function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = [];
}