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