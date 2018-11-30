import { RACES, UNIT_TYPES } from '../constants'
import { uniqueId } from 'lodash'

// eslint-disable-next-line
const mockedState = {
  creatures: [
    {
      id: uniqueId(),
      type: UNIT_TYPES.MONSTER,
      name: 'Mocked creature',
      power: '250',
      agi: '100',
      int: '150',
      requirements: ['At least 5'],
      rewardItems: ['1', '2', '0', '0'],
      spellIndexes: [17],
      imageIndex: -1,
      buffs: {},
    },
  ],
  fighters: [
    {
      id: uniqueId(),
      type: UNIT_TYPES.FIGHTER,
      nick: 'Arabella',
      race: RACES.PRIEST,
      level: '9',
      power: '50',
      agi: '50',
      int: '50',
      bonusPower: 0,
      bonusAgi: 0,
      bonusInt: 0,
      manaPool: 50,
      spellLevels: [1, 2, 3, 3, 1],
      spellCasted: [false, false, false, false, false],
      itemIndexes: [28, 29, 30, 27, 26, 32, 33, 34, 35, 36, 37, 40, 41, 42],
      itemLevels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      itemKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'],
      itemCasted: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      imageIndex: 0,
      buffs: {},
    },
  ],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'create',
}

export const createDefaultFighter = ({
  strigified,
  id,
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
  itemKeys,
  buffs,
}) => {
  const defaults = {
    level: strigified ? '1' : 1,
    power: strigified ? '' : 0,
    agi: strigified ? '' : 0,
    int: strigified ? '' : 0,
  }
  return {
    id: id || uniqueId(),
    type: UNIT_TYPES.FIGHTER,
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
    spellLevels: spellLevels || [1, 0, 0, 0, 0],
    spellCasted: spellCasted || [false, false, false, false, false],
    itemIndexes: itemIndexes || [],
    itemLevels: itemLevels || [],
    itemCasted: itemCasted || [],
    itemKeys: itemKeys || [],
    imageIndex: imageIndex || 0,
    buffs: buffs || {},
  }
}

export const createDefaultCreature = ({
  strigified,
  id,
  name,
  power,
  agi,
  int,
  requirements,
  rewardItems,
  spellIndexes,
  imageIndex,
  buffs,
}) => {
  const defaultValue = strigified ? '' : 0
  return {
    id: id || uniqueId(),
    type: UNIT_TYPES.MONSTER,
    name: name || '',
    power: power || defaultValue,
    agi: agi || defaultValue,
    int: int || defaultValue,
    requirements: requirements || [],
    rewardItems: rewardItems || [defaultValue, defaultValue, defaultValue, defaultValue],
    spellIndexes: spellIndexes || [],
    imageIndex: imageIndex || -1,
    buffs: buffs || {},
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
  originalCreatures: [],
  page: 'create',
}

export default () => state
