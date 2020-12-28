import { boss } from './boss.js';
import { party } from './party.js';
import { player } from './player.js';

function createPartyHealth() {
  for (let i = 0; i < 11; i++) {
    const health = {
      currentWidth: 100,
      healing: {
        totalHeal: 0,
        directHeal: 0,
        aoeHeal: {
          active: false,
          currentWidth: 100,
        },
      },
      damage: {
        totalDmg: 0,
        directDmg: 0,
        aoeDmg: {
          active: false,
          currentWidth: 100,
        },
      },
    };
    party.push(health);
  }
}
createPartyHealth();
