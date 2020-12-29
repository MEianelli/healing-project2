export const player = {
  spellsList: {
    renew: {
      name: 'renew',
      type: 'hot',
      targets: 1,
      hotsFreq: 1,
      hotsRep: 5,
      healAmount: 5,
      cooldown: 5,
      currentWidth: 100,
      manaCost: 5,
      timer: 0,
    },
    holy: {
      name: 'holy',
      type: 'heal',
      targets: 1,
      hotsFreq: 0,
      hotsRep: 1,
      healAmount: 0,
      cooldown: 0,
      currentWidth: 100,
      manaCost: 5,
      timer: 0,
    },
    shield: {
      name: 'shield',
      type: 'heal',
      targets: 1,
      hotsFreq: 0,
      hotsRep: 1,
      healAmount: 5,
      cooldown: 5,
      currentWidth: 100,
      manaCost: 5,
      timer: 0,
    },
    circle: {
      name: 'circle',
      type: 'hot',
      targets: 5,
      hotsFreq: 0,
      hotsRep: 1,
      healAmount: 2,
      cooldown: 3,
      currentWidth: 100,
      manaCost: 5,
      timer: 0,
    },
    lastStand: {
      name: 'lastStand',
      type: 'heal',
      targets: 1,
      hotsFreq: 0,
      hotsRep: 1,
      healAmount: 50,
      cooldown: 40,
      currentWidth: 100,
      manaCost: 5,
      timer: 0,
    },
    aoeRenew: {
      name: 'aoeRenew',
      type: 'hot',
      targets: 11,
      hotsFreq: 0.5,
      hotsRep: 6,
      healAmount: 2,
      cooldown: 40,
      currentWidth: 100,
      manaCost: 5,
      timer: 0,
    },
  },
  mana: {
    currentWidth: 100,
    regen: 0.1,
    regenFreq: 1,
  },
};
