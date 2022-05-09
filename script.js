'use strict';
// Selektovanje elemenata
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
//
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player = document.querySelector('.player');
//
const player0Rezultat = document.querySelector('#current--0');
const player1Rezultat = document.querySelector('#current--1');
//
let scores, trenutniRezultat, activePlayer, playing;
//
const init = function () {
  playing = true;
  scores = [0, 0];
  trenutniRezultat = 0;
  activePlayer = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  player0Rezultat.textContent = 0;
  player1Rezultat.textContent = 0;
  scores = [0, 0];
  diceEL.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  trenutniRezultat = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
// Selektovanje elemenata

// Pocetni uslovi
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');
// Pocetni uslovi

// 1.BITNO Bacanje kocke
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Biranje nasumicnog broja
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    // 2. Prikazati broj
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // 3. Provjeriti da li je broj 1:
    if (dice !== 1) {
      // ako nije - dodati broj u trenutno stanje
      trenutniRezultat += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        trenutniRezultat;
    } else {
      // ako jeste - sledeci igrac
      switchPlayer();
      diceEL.classList.add('hidden');
      // player0.classList.toggle('order');
      // player1.classList.toggle('order');
    }
  }
});
// 1.BITNO Bacanje kocke

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Dodati trenutbe bodove globalnim bodovima
    scores[activePlayer] += trenutniRezultat;
    // 2. Provjeriti da li su globalni bodovi iznad 100 ili ne
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
      diceEL.classList.add('hidden');
      // player0.classList.toggle('order');
      // player1.classList.toggle('order');
    }

    // 2.1. Zavrsiti igru
    // 2.2.  promjeniti igraca
  }
});
btnNew.addEventListener('click', init);
