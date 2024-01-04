'use strict';
let highScore = 0;
let score = 20;
const againButton = document.querySelector('.again');
let numberDisplay = document.querySelector('.number');
const scoreDisplay = document.querySelector('.score');
const highScoreDisplay = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
let message = document.querySelector('.message');
let guess = document.querySelector('.guess');


let numberGuess = Math.floor(Math.random() * 20) + 1;
console.log(numberGuess);

checkButton.addEventListener("click", () => {
    let guess = document.querySelector('.guess').value;
    if (score < 0) {
        message.textContent = 'You lose';
        score = 0;
        DisplayScore(score);
    }

    if (guess > 20 || guess <= 0) {
        message.textContent = 'Needs to be between 1-20';
    } else if (guess == numberGuess) {
        message.textContent = 'Congrats! You win!';
        numberDisplay.textContent = guess;
        CheckHighScore(highScore, score);

        document.querySelector('body').style.backgroundColor = '#60b247';
        document.querySelector('.number').style.width = '30rem';

    } else {
        if (guess > numberGuess) {
            message.textContent = 'Number is too high';
        } else if (guess < numberGuess) {
            message.textContent = 'Number is too low';
        }
        score--;
        DisplayScore(score);
    }
});

againButton.addEventListener("click", () => {
    score = 20;
    DisplayScore(score);
    guess.value = 0;
    numberDisplay.textContent = '?';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    numberGuess = Math.floor(Math.random() * 20) + 1;
});

function CheckHighScore (highScore, score) {
    if (score > highScore) {
        highScore = score;
    } else {
        score = highScore;
    }
    highScoreDisplay.textContent = score;
} 

function DisplayScore (score) {
    scoreDisplay.textContent = score;
}