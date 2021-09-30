const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanRemain = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hidePlay = document.querySelector(".play-again");
const word = "magnolia";

//write a function to add placeholders for each letter

const circle = function (word) {
    wordArray = []; //create empty array
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
    const catchLetter = letterInput.value; //assigns the inputted value to an object value
    console.log(catchLetter); //logs out the value saved in catchLetter
    letterInput.value = ""; //resets the form value to empty
});