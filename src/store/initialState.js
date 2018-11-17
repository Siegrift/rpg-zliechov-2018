// eslint-disable-next-line
const mockedState = {
  creatures: [
    {
      name: 'Mocked creature',
      power: '250',
      agi: '100',
      int: '150',
      requirements: ['At least 5'],
      rewardItems: ['1', '2', '0', '0'],
      spellIndexes: [0, 1],
      imageIndex: 2,
    },
  ],
  fighters: [
    {
      nick: 'Arabella',
      race: 0,
      level: '2',
      power: '50',
      agi: '50',
      int: '50',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: -1,
      spellLevels: [1, 1, 0, 0],
      itemIndexes: [0],
      itemLevels: [1],
      imageIndex: 1,
    },
    {
      nick: 'Berserk',
      race: 1,
      level: '2',
      power: '70',
      agi: '70',
      int: '70',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: -1,
      spellLevels: [1, 0, 1, 0],
      itemIndexes: [1, 2],
      itemLevels: [1, 1],
      imageIndex: 0,
    },
  ],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'fighters',
}

export const createDefaultFighter = () => ({
  nick: '',
  race: 0, // (0, 1, 2, 3, 4) = (Mág, Lovec, Kňaz, Černokňažník, Bojovník)
  level: '1',
  power: '',
  agi: '',
  int: '',
  bonusPower: 0,
  bonusAgi: 0,
  bonusInt: 0,
  manaPool: -1,
  spellLevels: [0, 0, 0, 0],
  itemIndexes: [],
  itemLevels: [],
  imageIndex: 0,
})

export const createDefaultCreature = () => ({
  name: '',
  power: '',
  agi: '',
  int: '',
  requirements: [],
  rewardItems: ['', '', '', ''],
  spellIndexes: [],
  imageIndex: 0,
})

const state = {
  // creatures[0] MUST be the one original
  creatures: [createDefaultCreature()],
  fighters: [createDefaultFighter()],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'create',
}

export default () => mockedState
