const tankContainer = document.querySelector('.tankContainer');
const partyContainer = document.querySelector('.partyContainer');
const buttonsContainer = document.querySelector('.buttonsContainer');
const manaContainer = document.querySelector('.manaContainer');

function createhealthDivs() {
  for (let i = 0; i < 11; i++) {
    const healthDiv = document.createElement('div');
    const health = document.createElement('div');
    health.classList.add('healthBar');
    healthDiv.classList.add('healthBarDiv');
    healthDiv.appendChild(health);
    partyContainer.appendChild(healthDiv);
  }
}
createhealthDivs();

function createButtons() {
  for (let i = 0; i < 4; i++) {
    const buttonDiv = document.createElement('div');
    const button = document.createElement('div');
    buttonDiv.classList.add('spellButtonDiv');
    button.classList.add('spellButton');
    buttonDiv.appendChild(button);
    buttonsContainer.appendChild(buttonDiv);
  }
}
createButtons();

function createManaBar() {
  const manaBar = document.createElement('div');
  manaBar.classList.add('manaBar');
  manaContainer.appendChild(manaBar);
}
createManaBar();
