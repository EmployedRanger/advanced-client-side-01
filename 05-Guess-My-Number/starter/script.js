'use strict';
let highScore = 0;
let score = 0;
const againButton = document.getElementsByClassName('again');
const numberDisplay = document.getElementsByClassName('number');
const scoreDisplay = document.getElementsByClassName('score');
const highScoreDisplay = document.getElementsByClassName('highscore');
const checkButton = document.getElementsByClassName('check');
const message = document.getElementsByClassName('message');
let guess = document.querySelector('.guess')


let numberGuess = Math.floor(Math.random(1, 20) * 20);
console.log(numberGuess);

console.log(scoreDisplay)
console.log(score)
checkButton.addEventListener("click", () => {
    let guess = document.querySelector('.guess');
})