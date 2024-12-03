let num = Math.floor(Math.random() * 100);
let numGuesses = 0;
let wins = 0;
let losses = 0;
let currGuess = 0;
let validInput = true;
let win = false;

let previousGuesses = document.querySelector("#previousGuesses");
let guessButton = document.querySelector("#guessButton");
let guessInput = document.querySelector("#guessInput");
let playAgain = document.querySelector("#playAgain");

guessButton.addEventListener("click", testNum);

playAgain.addEventListener("click", function() {
    num = Math.floor(Math.random() * 100);
    numGuesses = 0;
    resetStats();
    previousGuesses.innerText = "Previous Guesses: "
    message.innerText = "";
    guessInput.value = "";
    playAgain.style.display = "none";
    guessButton.style.display = "inline";
    guessInput.style.display = "inline";
});

function testNum() {
    console.log(num);

    let message = document.querySelector("#message");
    let guessCheck = document.querySelector("#guessCheck");
    currGuess = guessInput.value;
    numGuesses++;        

    validRange();
    printMessage();
    printGuess();
    updateStats();
}

function resetStats(){
    if(win) {
        let winCtr = document.querySelector("#currWins").innerText = "Current Wins: " + wins;
        let lossCtr = document.querySelector("#currLosses").innerText = "Current Losses: " + losses;
        let guessCtrMsg = document.querySelector("#guessesRemaining").innerText = "Guesses Remaining: " + "7";
        win = false;
    }
}
function updateStats() {

    let winCtr = document.querySelector("#currWins").innerText = "Current Wins: " + wins;
    let lossCtr = document.querySelector("#currLosses").innerText = "Current Losses: " + losses;
    let guessCtrMsg = document.querySelector("#guessesRemaining").innerText = "Guesses Remaining: " + (7-numGuesses);
}

function validRange() {
    if (currGuess < 0 || currGuess > 100) {
        validInput = false;
    } else {
        validInput = true;
    }
}

function printMessage() {
    if(numGuesses == 7 && validInput && currGuess == num) {
        wins++;
        win = true;
        message.innerText = "Congrats! You guess the correct number in "
         + numGuesses + " guesses! You have " + wins + " wins."; 
        message.style.color = "rgba(0, 201, 10, 0.647)";
        playAgain.style.display = "inline";
        guessButton.style.display = "none";
        guessInput.style.display = "none";
    }
    else if(validInput && numGuesses < 7) {
        if(currGuess < num) {
            message.innerText = "The number you entered is too low";
            message.style.color = "rgba(23, 12, 236, 0.634)";
        } else if (currGuess > num) {
            message.innerText = "The number you entered is too high";
            message.style.color = "rgba(247, 123, 160, 0.921)";
        } else if(currGuess == num){
            wins++;
            message.innerText = "Congrats! You guessed the correct number in "
             + numGuesses + " guesses! You have " + wins + " wins."; 
            win = true;
            message.style.color = "rgba(0, 201, 10, 0.647)";
            playAgain.style.display = "inline";
            guessButton.style.display = "none";
            guessInput.style.display = "none";
        }
    } else if(numGuesses < 7 && validInput == false){
        message.innerText = "Invalid Input";
    } else if(numGuesses >= 7) {
        message.innerText = "You Lost! Number of losses: " + ++losses + ". The number was " + num;
        win = true;
        playAgain.style.display = "inline";
        guessButton.style.display = "none";
        guessInput.style.display = "none";

    }
   
    message.style.fontWeight = "bold";
    guessInput.value = " ";
};

function printGuess(){
    previousGuesses.innerText += " " + currGuess;
}
