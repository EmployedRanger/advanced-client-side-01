import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('bread', 5);

console.log(price, tq);


import add, { cart } from './shoppingCart.js';
add('pizza', 8);
add('chicken', 4);
add('bananas', 7);

const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;
  
    const addToCart = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(
        `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
      );
    };
  
    const orderStock = function (product, quantity) {
      console.log(`${quantity} ${product} ordered from supplier`);
    };
  
    return {
      addToCart,
      cart,
      totalPrice,
      totalQuantity,
    };
})();
  
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

// importing modules allows for cleaner code and 
// to spread things out in a more organized manner
  
// Need to review this

import cloneDeep from 'lodash-es';

const state = {

cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
    ],
    user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
module.hot.accept();
}

class Person {
    #greeting = 'Hey';
    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}

const logan = new Person('Logan');

console.log('Logan' ?? null);

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve(('TEST').then(x => console.log(x);))

import 'core-js/stable';

import 'regenerator-runtime/runtime';

