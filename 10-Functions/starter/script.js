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

