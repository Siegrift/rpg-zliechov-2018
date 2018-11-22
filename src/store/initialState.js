import { RACES } from '../constants'

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
      imageIndex: 3,
      debuffs: {},
    },
  ],
  fighters: [
    {
      nick: 'Arabella',
      race: RACES.WARLOCK,
      level: '7',
      power: '50',
      agi: '50',
      int: '50',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: 50,
      spellLevels: [2, 3, 1, 1],
      itemIndexes: [0],
      itemLevels: [1],
      imageIndex: 0,
      buffs: [],
    },
    {
      nick: 'Berserk',
      race: RACES.MAGE,
      level: '7',
      power: '70',
      agi: '70',
      int: '10',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: 2,
      spellLevels: [1, 3, 2, 1],
      itemIndexes: [1, 2],
      itemLevels: [1, 1],
      imageIndex: 0,
      buffs: [],
    },
  ],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'assemble',
}

export const createDefaultFighter = (strigified) => ({
  nick: '',
  race: 0, // (0, 1, 2, 3, 4) = (Mág, Lovec, Kňaz, Černokňažník, Bojovník)
  level: strigified ? '1' : 1,
  power: strigified ? '' : 0,
  agi: strigified ? '' : 0,
  int: strigified ? '' : 0,
  bonusPower: 0,
  bonusAgi: 0,
  bonusInt: 0,
  manaPool: 0,
  spellLevels: [0, 0, 0, 0],
  itemIndexes: [],
  itemLevels: [],
  imageIndex: 0,
  buffs: [],
})

export const createDefaultCreature = (strigified) => ({
  name: '',
  power: strigified ? '' : 0,
  agi: strigified ? '' : 0,
  int: strigified ? '' : 0,
  requirements: [],
  rewardItems: [strigified ? '' : 0, strigified ? '' : 0, strigified ? '' : 0, strigified ? '' : 0],
  spellIndexes: [],
  imageIndex: 0,
  debuffs: {},
})

const state = {
  // creatures[0] MUST be the one original
  creatures: [createDefaultCreature(true)],
  fighters: [createDefaultFighter(true)],
  selectedCreature: 0,
  selectedFighter: 0,
  // will be set dynamically
  initialCreaturePower: [],
  page: 'page',
}

export default () => mockedState
