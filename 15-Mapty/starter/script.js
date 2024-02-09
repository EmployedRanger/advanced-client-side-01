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

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;

    }
}

class App {
    // # is private 
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor () {
        // Get location of user
        this._getPosition();

        // Get data from local storage
        this._getLocalStorage();

        // Attach event handlers
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));

    }

    _getPosition () {
        // Gets user location
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert('Could not get your position');
        });
    }

    _loadMap (position) {
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
        this.#map.on('click', function (mapE) {
            this.#mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        });
    }

    _showForm() {

    }

    _toggleElevationField() {

    }

    _newWorkout (e) {
        e.preventDefault();

        // Clear input fields
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
    
        console.log(mapEvent);
        const { lat, lng } = this.#mapEvent.latlng;
        L.marker([lat, lng]).addTo(this.#map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup(L.popup({
            maxWidth: 200,
            minWdith: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        })).openPopup();
    }
}




const app = new App();