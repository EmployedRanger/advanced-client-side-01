'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // Slice here creates a new array from the original data
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
     const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
          <div class="movements__value">${mov} €</div>
        </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) / 100)
  .filter((int, i, arr) => {
    // console.log(arr);
    return int >= 1;
  })
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}
// calcDisplaySummary(account1.movements);

const createUsernames = function (accounts) {
  accounts.forEach(function(account) {
    account.username = account.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });
}

createUsernames(accounts);
// calcDisplayBalance(accounts);

const updateUI = function(currentAccount) {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcDisplayBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
}

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  if (amount > 0 &&
     receiverAcc &&
     currentAccount.balance >= amount &&
     receiverAcc?.username !== currentAccount.username
  ) {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount);
      inputTransferTo.value = inputTransferAmount.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add a movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    accounts.splice(index, 1);

    // Hides UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


/////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

let dogsJulia = [[3, 5, 2, 12, 7], [9, 16, 6, 8, 3]];
let dogsKate = [[4, 1, 15, 8, 3], [10, 5, 6, 1, 4]];

// const checkDogs = function (dogsJulia, dogsKate) {
//   let dogsJuliaCopy = dogsJulia[0];
//   dogsJuliaCopy = dogsJuliaCopy.slice(1, 3);
//   console.log(dogsJuliaCopy);
//   dogsJuliaCopy = [dogsJuliaCopy, dogsJulia[1]];
  
//   let firstSet = [...dogsJuliaCopy[0], ...dogsKate[0]];
//   let secondSet = [...dogsJuliaCopy[1], ...dogsKate[1]];
//   console.log('firstSet:', firstSet);
//   firstSet.forEach(dog => {
//     ageCheck(dog);
//   });

//   secondSet.forEach(dog => {
//     ageCheck(dog, i);
//   });

//   function ageCheck (dog, i) {
//     let answer = '';
//     if (dog >= 3) {
//       answer = 'adult';
//     } else {
//        answer = 'puppy';
//     }
//     console.log(`Dog number ${firstSet[i + 1]} is an ${answer}, and is ${dog} years old`);
//   }


//   // console.log(`Dog number ${dog} `);
//   console.log('dogsJulia:', dogsJuliaCopy);
//   console.log(`dogsJulia:`, dogsKate);
// }

// checkDogs(dogsJulia, dogsKate);

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(2, 3);
//   const allDogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogsJuliaCorrected);
//   console.log(allDogs);
//   allDogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// }

// checkDogs(dogsJulia[0], dogsKate[0]);
// checkDogs(dogsJulia[1], dogsKate[1]);


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];


const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);

  const totalAges = adults.reduce((acc, age) => acc + age, 0);


  const length = adults.length;
  const aveAge = totalAges / length;

  // console.log(`The average dog age in human years is ${aveAge}`);
}
const avg1 = calcAverageHumanAge(testData1);
const avg2 = calcAverageHumanAge(testData2);
// console.log(avg1, avg2);

// ---------- NEXT ----------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov) {
//   return mov * eurToUsd;
// });

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD); 

// const movementsDescriptions = movements.map((mov, i) => 

//   `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`

// );
// console.log(movementsDescriptions);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawals = movements.filter(mov => mov < 0);
// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);

// accumulator -> snowball
// const balance = movements.reduce(function(acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

// Best way to do this. It's the above method, but shorter
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// For loop can work, but isn't best option
// let balance2 = 0;
// for (const mov of movements) balance += mov;
// console.log(balance2);

// Returns Maximum value from array
const max = movements.reduce((acc, mov) => {
  // acc keeps track of max value
  if (acc > mov) {
    return acc;
  } else return mov;
}, movements[0]);
// console.log(max);


// PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov < 0)
//   // .map(mov => mov * eurToUsd)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// // flat and flatMap
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overAllBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance);

// // flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// // flatMap
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

// console.log(movements);
// [200, 450, -400, 3000, -650, -130, 70, 1300]

// 'a' is first value, 'b' is next value
// return < 0, A, B
// return > 0, B, A

// Ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements);
//[-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// console.log(movements);
// [3000, 1300, 450, 200, 70, -130, -400, -650]

// Short version of ascending, switch a and b for descending
// movements.sort((a, b) => a - b);
// console.log(movements);

const arr = [1,2,3,4,5,6,7];
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
// x.fill(1);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z); // [ 1, 2, 3, 4, 5, 6, 7 ]

// Turns node list gotten from QuerySelectorAll and turns it into an array
labelBalance.addEventListener('click', function (e) {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI);

  // Method 2 to get array from node list, but have to map separetely
  const movementsUI2 = [...document.querySelector('.movements__value')];
});


///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

// Forumla: recommendedFood = weight ** 0.75 * 28
dogs.forEach(element => {
  const recommendedFood = Math.floor(element.weight ** 0.75 * 28);
  element['recFood'] = recommendedFood;
});

// Sarah's dog
let sarahDog = '';
const findDog = function (dogs) {
  dogs.forEach(dog => {
    if (dog.owners.includes('Sarah')) {
      return sarahDog = dog;
    }   
  });
}

const eatingHabit = function (dog) {
  if (dog.curFood > dog.recFood) {
    console.log('Dog is eating too much');
    return 0;
  } else if (dog.curFood === dog.recFood) {
    console.log('Dog is perfect');
    return 1;
  } else {
    console.log('Dog is eating to little');
    return 2;
  }
}

const withinReason = function (dog) {
  console.log('dog.recFood = ', dog.recFood);
  console.log('dogCurrFood = ', dog.curFood);
  if (dog.curFood >= (dog.recFood * 0.9) && dog.curFood <= (dog.recFood * 1.1)) {
    console.log('Dog is eating well');
    return 0;
  } else if (dog.curFood > dog.recFood * 1.1) {
    console.log('Dog is eating too much');
    return 1;
  } else {
    console.log('Dog is eating to little');
    return 2;
  }
}

findDog(dogs);
console.log('sarah', sarahDog);
eatingHabit(sarahDog);

const ownersEatingTooMuch = [];
const ownersEatingTooLittle = [];
const dogsEatingWell = [];
const dogsNotEatingWell = [];

dogs.forEach(dog => {
  const value = eatingHabit(dog);
  if (value == 0) {
    ownersEatingTooMuch.push(...dog.owners);
  } else {
    ownersEatingTooLittle.push(...dog.owners);
  }
});

// console.log('owners eating too much', ownersEatingTooMuch);
// console.log('owners eating too little', ownersEatingTooLittle);
// console.log(ownersEatingTooMuch[0], 'and', ownersEatingTooMuch[1], 'and', ownersEatingTooMuch[2], 'dogs are eating too much');
// console.log(ownersEatingTooLittle[0], 'and', ownersEatingTooLittle[1], 'and', ownersEatingTooLittle[2], 'dogs are eating too little');

dogs.forEach(dog => {
  const value = withinReason(dog);
  if (value == 0) {
    dogsEatingWell.push(dog)
  } else {
    dogsNotEatingWell.push(dog);
  }
});
console.log('dogs eating well', dogsEatingWell); 
console.log('dogs not eating well', dogsNotEatingWell);

const dogsCopy = dogs;
dogsCopy.sort((a, b) => {
  if (a.recFood > b.recFood) return 1;
  if (b.recFood > a.recFood) return -1;
})
console.log('dogsCopy', dogsCopy);
