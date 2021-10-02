const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanRemain = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hidePlay = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

//write a function to add placeholders for each letter

const circle = function (word) {
    const wordArray = []; //create empty array
    for (const letter of word) { //for of loop to loop over each letter in the word
    console.log(letter);
    wordArray.push("●"); //replace the letter with a ●
    };
    wordInProgress.innerText = wordArray.join(""); //join the array back as a string
};
circle(word);

//add an event listener for the button

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault(); //prevents reloading behavior when form is submitted
    message.innerText = ""; //empty message
    const catchLetter = letterInput.value; //assigns the inputted value to an object value
    console.log(catchLetter); //logs out the value saved in catchLetter
    letterInput.value = ""; //resets the form value to empty
    const correctGuess = validateInput(catchLetter); //originally put input as the argument which was incorrect
    console.log(correctGuess);
});

//add a regular function to check if the input is a letter and only inputs one letter

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if ( input === "" )  {
        //originally put letterInput instead of input, it needed to be input to work correctly since that was the argument passed
        message.innerText = "Please enter a guess";
    } else if (input.length > 1 ) {
        message.innerText = "Only enter one letter";
    } else if ( !input.match(acceptedLetter)) {
        message.innerText = "Please use letter not a character.";
    } else {
        return input;
    }
};


//add a function that captures the player's guess to see if they've already guessed that letter

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if ( guessedLetters.includes(guess) ) {
        message.innerText = "You've already guessed this letter, guess again."
        
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    } 
};

