'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// #1
const [players1, players2] = game.players;
console.log(players1, players2)

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers)

const allPlayers = [...players1, ...players2]
console.log(allPlayers)

const players1Final = [...players1, 'Thiago', 'Coutinho', '[Perisic'];
console.log(players1Final)

// #1.5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2)

// #1.6
const printGoals = function (...players) {
  console.log(players)
  console.log(`${players.length} goals were scored`)
};
console.log(...game.scored)
printGoals('malmstrom', 'nerd')

// #1.7
team1 < team2 && console.log('team1 is more likely to win')
team2 < team1 && console.log('team2 is more likely to win')


// #2
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`)
}

// My old attempt at not using what we just learned. Doesn't work 
// let numberScored = 0;
// for (let i = 0; i < game.scored.length; i++) {
//   const player = game.scored[i];
//   game.scored.forEach(player => {
  
//     console.log(`Goal ${numberScored + 1}: ${player}`)
//     return numberScored;
//   });
// }

// #2.2
const oddsVal = Object.values(game.odds);
let average = 0;
for (const odd of oddsVal) average += odd;
average /= oddsVal.length;
console.log(average) 

// #2.3
// NEEDS TO PRINT 
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

for (const [team, odd] of Object.entries(game.odds)) {
  const teamString = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamString}: ${odd}`);
}

// #2.4 bonus
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
  console.log(scorers);
}

console.log('------------ NUMBER 4 ------------');

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// #1
const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

let gameTime = 90;
let frequency = gameTime / gameEvents.size;
console.log(frequency);
console.log(`An event happened, on average, every ${frequency} minutes`);

gameTime = 92;
frequency = gameTime / gameEvents.size;
console.log(`An event happened, on average, every ${frequency} minutes`);

for (const [minutes, event] of gameEvents) {
  if (minutes <= 45) {
    console.log(`[FIRST HALF] ${minutes}: ${event}`);
  } else {
    console.log(`[SECOND HALF] ${minutes}: ${event}`);
  }
}

console.log('----- OR -----');
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}

console.log('------------ NUMBER 5 ------------');
///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀 */

// let str = 'this is a weird thing';
// str.replace(/(^|\s)[a-z]/gi, l => l.toUpperCase());
// console.log(str);

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let buttonEl = document.querySelector('button');
buttonEl.addEventListener('click', () => {
  const userText = document.querySelector('textarea').value;
  const rows = userText.split('\n');
  console.log(rows);
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);


    // let newRow = '';
    // newRow = row.split('_').map(word => word[0].toUpperCase + word.slice(1)).join(' ');
    // newRow = row.split('_');
    // newRow = row.split('_').map(([firstLetter, ...otherLetters ]) => `${firstLetter.toUpperCase()}${otherLetters.join("")}`).join('');
    // console.log(newRow, '✅');
  }
  
  console.log(userText, '✅')
});