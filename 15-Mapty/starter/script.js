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
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
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
        // this._getLocalStorage();

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
        const validInputs = (...inputs) => 
        inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...input) => inputs.every(inp => inp > 0);


        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;        
        let workout;

        // If workout is running, create running object
        if(type === 'running') {
            const cadence = +inputCadence.value;

            // Check is data is valid
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            ) return alert('Inputs have to be positive numbers')

            const workout = new Running([lat, lng], distance, duration, cadence);

        }

        // Cycling creates cycling workout
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            // Check if data is valid
            if (
            !validInputs(distance, duration, elevation) || !allPositive(distance, duration)
            ) return alert('Inputs have to be positive numbers');

            const workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to workout array
        this.#workouts.push(workout);

        // Render workout on map as marker
        this.renderWorkoutMarker(workout);

        // Render workouts on list

        // Clear input fields
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
     
    }

    renderWorkoutMarker (workout) {
        L.marker([lat, lng]).addTo(this.#map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${type}-popup`,
        })
        )
        .setPopupContent(workout.distance)
        .openPopup();
    }
}


const app = new App();