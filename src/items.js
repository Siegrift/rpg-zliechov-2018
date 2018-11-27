/*
Contains all items in a game. To add a new array look at './spells.js'.
The item object is structurally similar to 'spell' object.
*/

import { RACES, LAST_HERO_INDEX, SUMMONS } from './constants'
import { createDefaultFighter } from './store/initialState'
import * as helpers from './helpers'

export const itemTypes = ['Bežné', 'Vzácne', 'Legendárne', 'Prastaré']
export const RARITIES = {
  COMMON: 0,
  UNCOMMON: 1,
  LEGENDARY: 2,
  ANCIENT: 3,
}
export const ITEM = 0
export const SPELL = 1

export const items = [
  // mec
  {
    image: require('./assets/items/rapier.png'),
    title: 'Meč',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.HUNTER || fighter.race >= LAST_HERO_INDEX) {
        return true
      }
      return false
    },
    applyAura: (fighter) => {
      fighter.bonusAgi += 4
    },
    onInvoke: () => {}
  },
  // vzdusny elemental
  {
    image: require('./assets/items/rapier.png'),
    title: 'Vzdušný elementál',
    type: SPELL,
    rarity: RARITIES.COMMON,
    isEnabled: ({ fighter }) => {
      if (
        (fighter.race === RACES.PRIEST || fighter.race === RACES.WARLOCK) &&
        fighter.manaPool >= 1
      ) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      const elemental = createDefaultFighter({
          race: RACES.UNIT_WITHOUT_SPELLS,
          imageIndex: SUMMONS.AIR_ELEMENTAL,
          agi: 3,
        })
      helpers.addFighter(elemental, state)
      fighter.manaPool -= 1
    }
  },
  // stit
  {
    image: require('./assets/items/rapier.png'),
    title: 'Štít',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.WARRIOR || fighter.race === RACES.MAGE) {
        return true
      }
      return false
    },
    applyAura: (fighter) => {
      fighter.bonusPower += 5
    },
    onInvoke: () => {}
  },
  // prilba
  {
    image: require('./assets/items/rapier.png'),
    title: 'Prilba',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.WARRIOR || fighter.race === RACES.MAGE || fighter.race === RACES.PRIEST) {
        return true
      }
      return false
    },
    applyAura: (fighter) => {
      fighter.bonusPower += 4
    },
    onInvoke: () => {}
  },
  // luk
  {
    image: require('./assets/items/rapier.png'),
    title: 'Luk',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.HUNTER || fighter.race === RACES.SYMBIONT) {
        return true
      }
      return false
    },
    applyAura: (fighter) => {
      fighter.bonusAgi += 7
    },
    onInvoke: () => {}
  },
  // kusa
  {
    image: require('./assets/items/rapier.png'),
    title: 'Kuša',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.HUNTER || fighter.race === RACES.SYMBIONT) {
        return true
      }
      return false
    },
    applyAura: (fighter) => {
      fighter.bonusAgi += 5
    },
    onInvoke: () => {}
  },
  {
    image: require('./assets/items/agh.jpg'),
    title: 'Aghanim',
    onInvoke: ({ fighter }) => {
      fighter.power = fighter.power - 50
      fighter.agi += 50
    },
    isEnabled: ({ fighter }) => fighter.power >= 100,
  },
  {
    image: require('./assets/items/dagon.jpg'),
    title: 'Dagon',
    onInvoke: ({ fighter }) => {
      fighter.power = fighter.power + 50
    },
    isEnabled: ({ fighter }) => true,
  },
  {
    image: require('./assets/items/manta.png'),
    title: 'Manta',
    onInvoke: ({ fighter }) => {
      fighter.power = fighter.power + 50
    },
    isEnabled: ({ fighter }) => true,
  },
  {
    image: require('./assets/items/frostmourne.jpg'),
    title: 'Mrazivý smútok',
    onInvoke: ({ fighter, index }) => {
      const level = fighter.itemLevels[index]
      fighter.bonusPower += 5 + (level - 1) * 3
      fighter.bonusAgi += 5 + (level - 1) * 3
    },
  },
  {
    image: require('./assets/items/rapier.png'),
    title: 'Božský rapier',
    onInvoke: ({ fighter }) => {
      fighter.bonusAgi += 80
    },
  },
  {
    image: require('./assets/items/black_hole.jpg'),
    title: 'Black hole',
    onInvoke: ({ state }) => {
      state.creatures = []
    },
    isEnabled: ({ fighter }) => fighter.manaPool >= 20,
  },
]