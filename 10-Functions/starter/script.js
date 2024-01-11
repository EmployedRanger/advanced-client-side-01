'use strict';


const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};
greet('Yeet')("whipped")

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('hi')('logan');

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNUm, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNUm}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNUm}`, name });
    },
};

lufthansa.book(324, 'Logan Malmstrom');
lufthansa.book(423, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Works perfectly
book.call(eurowings, 238, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 231, 'yeeter');
console.log(lufthansa);

book.call(swiss, 543, 'Senya Ranger');
console.log(swiss);

const flightData = [243, 'Jorge Cooper']
// Apply method
// book.apply(swiss, flightData);

// Better method, use 'call()'
book.call(swiss, ...flightData);
console.log(swiss)

// Bind method
// book.call(eurowings, 238, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(238, 'Steven Williams');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 238);
bookEW23('Logan Malmstrom');
bookEW23('Martha Cooper');
console.log(eurowings);


// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this); // <button class="buy">Buy new plane 🛩</button>
    this.planes++;
    console.log('this.planes:', this.planes); // quantity of planes
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Using bind really gives us a new function, adding from a more general function

const addVAT = addTax.bind(null, 0.23);
// Now addVAT is this:
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// Function returns a function

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * 0.23;
    }
}

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));



///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        // Get answer from user
        const answer = Number(
            prompt()
    }
};

document.querySelector(".poll").addEventListener('click', function () {
    poll.registerNewAnswer.bind()
});
