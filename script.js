import { boss } from './boss.js';
import { party } from './party.js';
import { player } from './player.js';

const framesPerSecond = 1000 / 10;
const activeTimers = [...boss.spellList];
const healthDivs = document.querySelectorAll('.healthBar');
const tankDiv = document.querySelector('.tankBar');
let animation = true;
let mouseTimer = 0;
let mousePressed = false;

window.onload = function () {
  addClickEvents();
  startAnimation();
};

function startAnimation() {
  updateTimers(activeTimers);
  updateHealthDivs();
  updateMouseTimer();

  if (animation) {
    setTimeout(() => {
      startAnimation();
    }, framesPerSecond);
  }
}

function updateMouseTimer() {
  if (mousePressed) {
    mouseTimer += 0.1;
  }
}

function startMouseTimer() {
  mousePressed = true;
}

function stoptMouseTimer(index) {
  mousePressed = false;
  console.log(index);

  mouseTimer = 0;
}

function addClickEvents() {
  healthDivs.forEach(bar => {
    bar.addEventListener('mousedown', () => {
      startMouseTimer();
    });
    bar.addEventListener('mouseup', event => {
      stoptMouseTimer(event);
    });
  });
}

function updateHealthDivs() {
  tankDiv.style.width = `${party[0].currentWidth}%`;
  healthDivs.forEach((bar, index) => {
    bar.style.width = `${party[index + 1].currentWidth}%`;
  });
}

function updateTimers(array) {
  array.forEach(spell => {
    spell.timer += 0.1;
    if (spell.timer >= spell.cooldown) {
      actionWhenFinished(spell, spell.type);
      spell.timer = 0;
    }
  });
}

function arrayOfTargetsIndexes(number) {
  if (number === 11) return Array.from(Array(number), (_, i) => i);
  const targets = [];
  while (targets.length < number) {
    const randomIndex = Math.floor(Math.random() * 11);
    if (!targets.includes(randomIndex)) targets.push(randomIndex);
  }
  return targets;
}

function tankDmg(spell) {
  let randomDmg = Math.random() * 3 - 1.5;
  party[0]['currentWidth'] -= spell.dmg + randomDmg;
  if (party[0].currentWidth < 0) party[0]['currentWidth'] = 0;
}

function aoe(spell) {
  const targets = arrayOfTargetsIndexes(spell.targets);
  targets.forEach(index => {
    party[index]['currentWidth'] -= spell.dmg;
    if (party[index].currentWidth < 0) party[index]['currentWidth'] = 0;
  });
}

const callBacksActions = {
  tankDmg: tankDmg,
  aoe: aoe,
};

function actionWhenFinished(obj, callback) {
  callBacksActions[callback](obj);
}
