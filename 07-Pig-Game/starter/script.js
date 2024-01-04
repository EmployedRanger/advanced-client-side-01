'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let scores, activePlayer, currentScore, playing;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1: 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

// Starting conditions
const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
}

btnNew.addEventListener('click', init);

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;
        console.log(dice);
    
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        // Check if player's score is > 100
        if (scores[activePlayer] >= 20) {
            // Finish Game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch player
            switchPlayer();
        }
    }
});

init();
