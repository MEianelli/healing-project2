import { boss } from './boss.js';
import { party } from './party.js';
import { player } from './player.js';

const framesPerSecond = 1000 / 10;
const activeTimers = [...boss.spellList];
const activeHots = [];
const healthBars = document.querySelectorAll('.healthBar');
const healthDivs = document.querySelectorAll('.healthBarDiv');
const castingDiv = document.querySelector('.castingDiv');
let animation = true;
let mouseTimer = 0;
let mousePressed = false;

window.onload = function () {
  window.addEventListener('mousemove', e => {
    updateCastingDiv(e);
  });
  addClickEvents();
  startAnimation();
};

function startAnimation() {
  updateTimers(activeTimers);
  updateHealthBars();
  updateHots(activeHots);
  updateMouseTimer();
  updateCastingDiv();

  if (animation) {
    setTimeout(() => {
      startAnimation();
    }, framesPerSecond);
  }
}

function updateHots(array) {
  array.forEach((hot, i) => {
    hot[1] += 0.1;
    if (hot[1] >= 1) {
      party[hot[0]].currentWidth += player.spellsList.renew.healAmount;
      hot[1] = 0;
      hot[2] += 1;
    }
    if (hot[2] === player.spellsList.renew.hotsRep) {
      party[hot[0]].healing.aoeHeal = false;
      healthBars[hot[0]].style.backgroundColor = 'lightgreen';
      array.splice(i, 1);
    }
  });
}

function updateCastingDiv(event = null) {
  if (mousePressed) castingDiv.style.display = 'block';
  else castingDiv.style.display = 'none';
  if (event) {
    castingDiv.style.top = `${event.clientY + 20}px`;
    castingDiv.style.left = `${event.clientX + 20}px`;
  }
}

function castRenew(index) {
  if (!party[index].healing.aoeHeal) {
    activeHots.push([index, 0, 0]);
    party[index].healing.aoeHeal = true;
  }
}

function castHold(timer, index) {
  party[index]['currentWidth'] += timer * 4;
}

function handleHeal(hold, index) {
  if (hold < 0.3) {
    castRenew(index);
  } else {
    castHold(hold, index);
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
  handleHeal(mouseTimer, index);
  mouseTimer = 0;
}

function addClickEvents() {
  healthDivs.forEach((bar, index) => {
    bar.addEventListener('mousedown', () => {
      startMouseTimer();
    });
    bar.addEventListener('mouseup', () => {
      stoptMouseTimer(index);
    });
  });
}

function updateHealthBars() {
  healthBars.forEach((bar, index) => {
    let tempObj = party[index];
    if (tempObj.healing.aoeHeal) bar.style.backgroundColor = 'lightsalmon';
    if (tempObj.currentWidth < 0) party[index]['currentWidth'] = 0;
    if (tempObj.currentWidth > 100) party[index]['currentWidth'] = 100;
    bar.style.width = `${party[index].currentWidth}%`;
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
}

function aoe(spell) {
  const targets = arrayOfTargetsIndexes(spell.targets);
  targets.forEach(index => {
    party[index]['currentWidth'] -= spell.dmg;
  });
}

const callBacksActions = {
  tankDmg: tankDmg,
  aoe: aoe,
};

function actionWhenFinished(obj, callback) {
  callBacksActions[callback](obj);
}
