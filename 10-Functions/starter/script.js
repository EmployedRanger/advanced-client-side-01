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
    name: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};