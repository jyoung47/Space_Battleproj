class Ship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(target) {
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
      console.log(`${this.name} attacks ${target.name} and deals ${this.firepower} damage!`);
    } else {
      console.log(`${this.name} misses the attack on ${target.name}!`);
    }
  }
}

class Spaceship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.attack = this.attack.bind(this); // Bind attack method to the instance
  }

  get hull() {
    return this._hull;
  }

  get firepower() {
    return this._firepower;
  }

  get accuracy() {
    return this._accuracy;
  }

  set hull(value) {
    this._hull = value >= 0 ? value : 0;
  }

  set firepower(value) {
    this._firepower = value;
  }

  set accuracy(value) {
    this._accuracy = value >= 0 && value <= 1 ? value : 0.7;
  }

  updatePlayerStats() {
    document.getElementById('player-hull').textContent = this.hull;
    document.getElementById('player-firepower').textContent = this.firepower;
  }

  attack(target) {
    if (Math.random() < this.accuracy) {
      console.log('Attack successful!');
      target.hull -= this.firepower;
      if (target.hull <= 0) {
        console.log('Enemy ship destroyed!');
        return true;
      } else {
        console.log(`Enemy ship hull: ${target.hull}`);
      }
    } else {
      console.log('Attack missed!');
    }
    this.updatePlayerStats();
    return false;
  }
}

class AlienShip {
  constructor() {
    this.name = "The UFO";
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = Math.random() * 0.3 + 0.6;
  }

  get hull() {
    return this._hull;
  }

  get firepower() {
    return this._firepower;
  }

  get accuracy() {
    return this._accuracy;
  }

  set hull(value) {
    this._hull = value >= 0 ? value : 0;
  }

  set firepower(value) {
    this._firepower = value;
  }

  set accuracy(value) {
    this._accuracy = value >= 0 && value <= 1 ? value : 0.7;
  }

  updateAlienStats() {
    document.getElementById('alien-hull').textContent = this.hull;
    document.getElementById('alien-firepower').textContent = this.firepower;
  }

  attack(target) {
    if (Math.random() < this.accuracy) {
      alert('Alien ship hit you!');

      target.hull -= this.firepower;
      if (target.hull <= 0) {
        alert('Your ship destroyed! Game over!');
        return true;
      } else {
        alert(`Your ship hull: ${target.hull}`);
      }
    } else {
      alert('Alien ship attack missed!');
    }

    return false;
  }
}

// Initialize player and alien ships
const yourShip = new Spaceship(20, 5, 0.7);
const alienShips = Array.from({ length: 6 }, () => new AlienShip());

// Game logic
let currentShipIndex = 0;
let gameOver = false;

function nextRound() {
  if (gameOver) {
    return;
  }

  const currentShip = alienShips[currentShipIndex];

  if (currentShip.hull <= 0) {
    alert(`${currentShip.name} has been destroyed!`);
    currentShipIndex++;

    if (currentShipIndex >= alienShips.length) {
      alert('Good Job soldier! You have destroyed all the UFOs. Winner winner chicken dinner!');
      gameOver = true;
      return;
    }
  }

  if (yourShip.hull <= 0) {
    alert('Bro the spaceship has been destroyed. You weak ASF, Game Over!');
    gameOver = true;
    return;
  }

  yourShip.attack(currentShip);

  if (currentShip.hull > 0) {
    const yourShipDestroyed = currentShip.attack(yourShip);
    if (yourShipDestroyed) {
      alert('Damn, Your spaceship has been destroyed. Game Over!');
      gameOver = true;
    }
  }

// updating the stats on webpage
yourShip.updatePlayerStats();
currentShip.updateAlienStats();
}
document.querySelector('.centered-button').addEventListener('click', nextRound);

document.querySelector('.centered-button2').addEventListener('click', () => {
  alert('Why you cop out Fool!!!???...Game Over!');
});
