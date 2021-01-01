export const boss = {
  spellList: [
    {
      name: 'AttackTank',
      type: 'tankDmg',
      cooldown: 1.5,
      targets: 1,
      dmg: 3.5,
      timer: 0,
    },
    {
      name: 'cleave',
      type: 'aoe',
      cooldown: 1,
      targets: 3,
      aoeFreq: 0.5,
      aoeRep: 4,
      dmg: 5,
      timer: 0,
    },
    {
      name: 'firestorm',
      type: 'aoe',
      cooldown: 600,
      targets: 11,
      aoeFreq: 0,
      aoeRep: 1,
      dmg: 10,
      timer: 0,
    },
  ],
};
