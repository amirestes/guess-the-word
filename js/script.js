const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    circle(word);
};

getWord();

//write a function to add placeholders for each letter

const circle = function (word) {
    const wordArray = []; //create empty array
    for (const letter of word) { //for of loop to loop over each letter in the word
    //console.log(letter);
    wordArray.push("●"); //replace the letter with a ●
    };
    wordInProgress.innerText = wordArray.join(""); //join the array back as a string
};

//add an event listener for the button

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault(); //prevents reloading behavior when form is submitted
    message.innerText = ""; //empty message
    const guess = letterInput.value; //assigns the inputted value to an object value
    
    const correctGuess = validateInput(guess); //originally put input as the argument which was incorrect

    if (correctGuess) {
        makeGuess(guess);
    }
    letterInput.value = ""; //resets the form value to empty
});

//add a regular function to check if the input is a letter and only inputs one letter

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if ( input.length === 0 )  {
        //originally put letterInput instead of input, it needed to be input to work correctly since that was the argument passed
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1 ) {
        message.innerText = "Only enter one letter";
    } else if ( !input.match(acceptedLetter)) {
        message.innerText = "Please use letter not a character.";
    } else {
        return input;
    }
};


//add a function that captures the player's guess to see if they've already guessed that letter

const makeGuess = function (guess) { //catchLetter was defined in the event handler
    guess = guess.toUpperCase();
    if ( guessedLetters.includes(guess) ) {
        message.innerText = "You've already guessed this letter, guess again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessCount(guess);//calls the function to count guesses
        showGuess(); //calls the function to display the guessed letters on the screen
        updateProgress(guessedLetters);
    } 
};

//create a function to show the guessed letters

const showGuess = function () {
    guessedLettersElement.innerHTML = ""; //empty the innerHTML of the unordered list where the player's guessed letters will display
    
    //create a new list for each letter your guessedLetters array and add it to the unordered list.
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);    
    }
};

//create a function to update the word in progress: this will replace the circle symbols with the correct letters guessed

const updateProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); //changes word to uppercase
    const wordArray = wordUpper.split(""); //splits the word string into an array so the letter can appear in the guessedLetters array
    //console.log(wordArray);
    const correctAnswers = []; //creates empty array
    for ( const letter of wordArray ) { //loop over entered letters
        if ( guessedLetters.includes(letter) ){
        correctAnswers.push(letter.toUpperCase() ); //if the letter is in the word it is going to add it to the array
        } else {
            correctAnswers.push ("●"); //if the letter is not in the word it is going to add a ●
        }
    }
    wordInProgress.innerText = correctAnswers.join(""); 
    //will combine the two arrays into a new array to display
    winnerWinner();
};

//Create a function to count guesses remaining

const guessCount = function (guess) {
    const upperWord = word.toUpperCase();
    if ( !upperWord.includes(guess) ) {
        message.innerText = `Sorry, ${guess} is not in the word. Try again.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! ${guess} is in the word.`;
    }

    if ( remainingGuesses === 0 ){
        message.innerHTML = `You are out of guesses! GAME OVER! The word was <span class="highlight">${word}</span>`;
        startOver();
    } else if ( remainingGuesses === 1 ) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess remaining!`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses remaining!`;
    }
};

//create a function to check if the player won

const winnerWinner = function () {
    if ( word.toUpperCase() === wordInProgress.innerText ) {
        message.classList.add("win");
        message.innerHTML = `<p class ="highlight"> You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

//create a function to hide and show elements
const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//add a click event to the play again button
playAgainButton.addEventListener ("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    
    getWord();

    //populate the text of the span inside the p where the remaining guesses display
    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    
});