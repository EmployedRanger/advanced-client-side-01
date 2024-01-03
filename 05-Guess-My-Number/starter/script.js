'use strict';
let highScore = 0;
let score = 20;
const againButton = document.querySelector('.again');
let numberDisplay = document.querySelector('.number');
const scoreDisplay = document.querySelector('.score');
const highScoreDisplay = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
let message = document.querySelector('.message');
let guess = document.querySelector('.guess').value;


let numberGuess = Math.floor(Math.random(1, 20) * 20);
console.log(numberGuess);
console.log(message);
console.log(guess);

checkButton.addEventListener("click", () => {
    let guess = document.querySelector('.guess').value;
    numberDisplay.textContent = guess;
    if (guess > 20 || guess <= 0) {
        message.textContent = 'Needs to be between 1-20';
        console.log(message.textContent);
    } else if (guess == numberGuess) {
        message.textContent = 'Congrats! You win!';
        console.log(message);
        numberDisplay = numberGuess;
        CheckHighScore(highScore, score);
    } else {
        if (guess > numberGuess) {
            message.textContent = 'Number is too high';
        } else if (guess < numberGuess) {
            message.textContent = 'Number is too low';
        }
        score -= 1;
        DisplayScore(score);
    }
});

againButton.addEventListener("click", () => {
    score = 20;
    guess = 0;
    numberDisplay = '?';
});

function CheckHighScore (highScore, score) {
    console.log('CheckHighScore ran');
    if (score > highScore) {
        highScore = score;
    } else {
        score = highScore;
    }
    console.log('score is', score)
    highScoreDisplay.textContent = score;
} 

function DisplayScore (score) {
    scoreDisplay.textContent = score;
}