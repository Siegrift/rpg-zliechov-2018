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
      buffs: {},
    },
  ],
  fighters: [
    {
      nick: 'Arabella',
      race: RACES.MAGE,
      level: '7',
      power: '50',
      agi: '50',
      int: '50',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: 50,
      spellLevels: [0, 2, 3, 1, 1],
      spellCasted: [false, false, false, false, false],
      itemIndexes: [0],
      itemLevels: [1],
      itemCasted: [false],
      imageIndex: 0,
      buffs: {},
    },
    {
      nick: 'Berserk',
      race: RACES.WARLOCK,
      level: '7',
      power: '70',
      agi: '70',
      int: '10',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: 2,
      spellLevels: [0, 1, 3, 2, 1],
      spellCasted: [false, false, false, false, false],
      itemIndexes: [1, 2],
      itemLevels: [1, 1],
      itemCasted: [false, false],
      imageIndex: 0,
      buffs: {},
    },
  ],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'assemble',
}

export const createDefaultFighter = ({
  strigified,
  race,
  spellLevels,
  spellCasted,
  imageIndex,
  nick,
  level,
  power,
  agi,
  int,
  bonusPower,
  bonusAgi,
  bonusInt,
  manaPool,
  itemIndexes,
  itemLevels,
  itemCasted,
  buffs,
}) => {
  const defaults = {
    level: strigified ? '1' : 1,
    power: strigified ? '' : 0,
    agi: strigified ? '' : 0,
    int: strigified ? '' : 0,
  }
  return {
    nick: nick || '',
    race: race || 0, // (0, 1, 2, 3, 4) = (Mág, Lovec, Kňaz, Černokňažník, Bojovník)
    level: level || defaults.level,
    power: power || defaults.power,
    agi: agi || defaults.agi,
    int: int || defaults.int,
    bonusPower: bonusPower || 0,
    bonusAgi: bonusAgi || 0,
    bonusInt: bonusInt || 0,
    manaPool: manaPool || 0,
    spellLevels: spellLevels || [0, 0, 0, 0, 0],
    spellCasted: spellCasted || [false, false, false, false, false],
    itemIndexes: itemIndexes || [],
    itemLevels: itemLevels || [],
    itemCasted: itemCasted || [],
    imageIndex: imageIndex || 0,
    buffs: buffs || [],
  }
}

export const createDefaultCreature = ({
  strigified,
  name,
  power,
  agi,
  int,
  requirements,
  rewardItems,
  spellIndexes,
  imageIndex,
  debuffs,
}) => {
  const defaultValue = strigified ? '' : 0
  return {
    name: name || '',
    power: power || defaultValue,
    agi: agi || defaultValue,
    int: int || defaultValue,
    requirements: requirements || [],
    rewardItems: rewardItems || [defaultValue, defaultValue, defaultValue, defaultValue],
    spellIndexes: spellIndexes || [],
    imageIndex: imageIndex || 0,
    debuffs: debuffs || {},
  }
}

const state = {
  // creatures[0] MUST be the one original
  creatures: [createDefaultCreature({ stringified: true })],
  fighters: [createDefaultFighter({ stringified: true })],
  selectedCreature: 0,
  selectedFighter: 0,
  // will be set dynamically
  initialCreaturePower: [],
  page: 'page',
}

export default () => mockedState
