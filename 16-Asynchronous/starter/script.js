'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/


const renderCountry = function (data, className = '') {
    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbor = function (country) {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
    
        // Render country 1
        renderCountry(data);
    
        // Get neighbor country (2)
        const [neighbor] = data.borders;
    
        if (!neighbor) return;
    
        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://countries-api-836d.onrender.com/countries/v2/alpha/${neighbor}`);
        request2.send();
    
        request2.addEventListener('load', function () {
            const data2 = JSON.parse(this.responseText);
            console.log(data2);
    
            renderCountry(data2, 'neighbor');
        });
    });
};

// getCountryAndNeighbor('portugal');
// getCountryData('usa');
// getCountryData('germany');
// getCountryData('china');
// getCountryData('russia');

const request = fetch('https://countries-api-836d.onrender.com/countries/usa');

console.log(request);


// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'ugiycthgxfr';

//       if (!neighbor) return;

//       // Country 2
//       return fetch(`https://countries-api-836d.onrender.com/countries/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(`${err} `);
//       renderError(`Something went wrong  ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };


const lotteryPromise = new Promise(function(resolve, reject) {
    if(Math.random() >= 0.5) {
        resolve('yeeter');
    } else {
        reject('weeper');
    }
});
// prints promise to console
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err))
