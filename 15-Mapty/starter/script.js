'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor () {
        // Get position of user
        this.getPosition();

        // Get data from local storage
        this._getLocalStorage();

        // Attach the event handlers

    }

    _getPosition () {

    }

    _loadMap () {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    
        const coords = [latitude, longitude];
    
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
    
        // Handling clicks on map
    
    }

    _showForm() {

    }

    _toggleElevationField() {

    }

    _newWorkout () {
        
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';

    console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup(L.popup({
        maxWidth: 200,
        minWdith: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
    })).openPopup();
});

inputType.addEventListener('change', function() {
    inputElevation.closest('.form__row').classList.toggle('form__row__hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row__hidden');
});
