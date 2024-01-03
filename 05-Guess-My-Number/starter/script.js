'use strict';
let highScore = 0;
let score = 0;
const againButton = document.querySelector('.again');
let numberDisplay = document.querySelector('.number').textContent;
const scoreDisplay = document.querySelector('.score').textContent;
const highScoreDisplay = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
let message = document.querySelector('.message').textContent;
let guess = document.querySelector('.guess').value;


let numberGuess = Math.floor(Math.random(1, 20) * 20);
console.log(numberGuess);
console.log(message);
console.log(guess);

checkButton.addEventListener("click", () => {
    let guess = document.querySelector('.guess').textContent;
    console.log(guess);
    if (guess > 20) {
        message = 'Needs to be between 1-20';
        console.log(message);
    } else if (guess == numberGuess) {
        message = 'Congrats! You win!';
        console.log(message);
        numberDisplay = numberGuess;
        highScore = score;
    } else {
        message = 'Try again';
        console.log(message);
        score -= 1;
    }
})