import { boss } from './boss.js';
import { party } from './party.js';
import { player } from './player.js';

const framesPerSecond = 1000 / 10;
const activeTimers = [...boss.spellList];
const activeHots = [];
const availableTargets = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const healthBars = document.querySelectorAll('.healthBar');
const healthDivs = document.querySelectorAll('.healthBarDiv');
const castingDiv = document.querySelector('.castingDiv');
const manaBar = document.querySelector('.manaBar');
const spellButton = document.querySelectorAll('.spellButton');
const clickDelay = 0.3;
let animation = true;
let mouseTimer = 0;
let mousePressed = false;
let healTargetIndex = -1;
let isCasting = false;
let mouseX;
let mouseY;

window.onload = function () {
  addClickEvents();
  startAnimation();
};

function startAnimation() {
  updateTimers(activeTimers);
  updateHealthBars();
  updateHots(activeHots);
  updateMouseTimer();

  if (animation) {
    setTimeout(() => {
      startAnimation();
    }, framesPerSecond);
  }
}

function updateMana(spellName) {
  const manaCost = player.spellsList[spellName].manaCost;
  player.mana['currentWidth'] -= manaCost;
  manaBar.style.width = `${player.mana['currentWidth']}%`;
}

function allowCasting(spellName, index) {
  const {
    mana: { currentWidth },
  } = player;
  if (player.spellsList[spellName].manaCost > currentWidth) return false;
  if (party[index].currentWidth <= 0) return false;
  return true;
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

function updateCastingDiv() {
  if (allowCasting('hold', healTargetIndex)) {
    castingDiv.style.top = `${mouseY - 20}px`;
    castingDiv.style.left = `${mouseX + 40}px`;
    castingDiv.style.display = 'block';
  }
}

function castRenew(index) {
  if (!party[index].healing.aoeHeal) {
    activeHots.push([index, 0, 0]);
    party[index].healing.aoeHeal = true;
    updateMana('renew');
  }
}

function castHold(timer, index) {
  party[index]['currentWidth'] += timer * 4;
  player.spellsList.hold['manaCost'] = timer;
  updateMana('hold');
}

function handleHeal(hold) {
  if (hold < clickDelay && allowCasting('renew', healTargetIndex)) {
    castRenew(healTargetIndex);
  } else if (allowCasting('hold', healTargetIndex)) {
    castHold(hold, healTargetIndex);
  }
}

function updateMouseTimer() {
  if (mousePressed) {
    mouseTimer += 0.1;
    if (mouseTimer > clickDelay && mouseTimer < clickDelay * 1.1) isCasting = true;
    if (isCasting) {
      isCasting = false;
      updateCastingDiv();
    }
  } else {
    castingDiv.style.display = 'none';
  }
}

function startMouseTimer() {
  mousePressed = true;
}

function stoptMouseTimer() {
  mousePressed = false;
  handleHeal(mouseTimer);
  mouseTimer = 0;
}
aaaaaaaaaaaaaaaaaaaaaa;
function castSpell(index) {
  animation = false;
}

function addClickEvents() {
  healthDivs.forEach((bar, index) => {
    bar.addEventListener('mousedown', event => {
      /*       console.log(event.target.style.width);
      console.log(party[index].currentWidth); */

      mouseX = event.x;
      mouseY = event.y;
      healTargetIndex = index;
      startMouseTimer();
    });
    bar.addEventListener('mouseup', () => {
      stoptMouseTimer();
    });
  });
  spellButton.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      castSpell(index);
    });
  });
}

function updateHealthBars() {
  availableTargets.forEach(index => {
    let tempObj = party[index];
    if (tempObj.healing.aoeHeal) healthBars[index].style.backgroundColor = 'lightsalmon';
    if (tempObj.currentWidth <= 0) {
      party[index]['currentWidth'] = 0;
      healthBars[index].style.border = '0px';
      availableTargets.delete(index);
    }
    if (tempObj.currentWidth > 100) party[index]['currentWidth'] = 100;
    healthBars[index].style.width = `${party[index].currentWidth}%`;
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
  const size = availableTargets.size;
  if (number === 11 || number >= size) return [...availableTargets];
  const targets = [];
  while (targets.length < number) {
    const randomIndex = [...availableTargets][Math.floor(Math.random() * size)];
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
