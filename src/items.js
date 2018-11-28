import { powerDmg, agiDmg, addFighter } from './helpers'
import { RACES, LAST_HERO_INDEX, SUMMONS, ATTRIBUTES } from './constants'
import { createDefaultFighter } from './store/initialState'

/*
Contains all items in a game. To add a new array look at './spells.js'.
The item object is structurally similar to 'spell' object.
*/

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
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 4
    },
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
        agi: 2,
      })
      addFighter(elemental, state)
      fighter.manaPool -= 1
    },
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
    applyAura: ({ fighter }) => {
      fighter.bonusPower += 5
    },
  },
  // prilba
  {
    image: require('./assets/items/rapier.png'),
    title: 'Prilba',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (
        fighter.race === RACES.WARRIOR ||
        fighter.race === RACES.MAGE ||
        fighter.race === RACES.PRIEST
      ) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusPower += 4
    },
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
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 7
    },
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
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 5
    },
  },
  // barla
  {
    image: require('./assets/items/rapier.png'),
    title: 'Barla',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (
        fighter.race === RACES.PRIEST ||
        fighter.race === RACES.MAGE ||
        fighter.race === RACES.WARLOCK
      ) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusInt += 5
    },
  },
  // zezlo
  {
    image: require('./assets/items/rapier.png'),
    title: 'Žezlo',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (
        fighter.race === RACES.PRIEST ||
        fighter.race === RACES.MAGE ||
        fighter.race === RACES.WARLOCK
      ) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusInt += 4
    },
  },
  // elixir zivota
  {
    image: require('./assets/items/rapier.png'),
    title: 'Elixír života',
    type: SPELL,
    rarity: RARITIES.COMMON,
    isEnabled: ({ fighter }) => {
      return true
    },
    onInvoke: ({ fighter }) => {
      fighter.bonusPower += 12
    },
  },
  // kuzelny ludsky prsten
  {
    image: require('./assets/items/rapier.png'),
    title: 'Kúzelný ľudský prsteň',
    type: ITEM,
    rarity: RARITIES.COMMON,
    passive: true,
    ring: true,
    isEnabled: ({ fighter }) => {
      return true
    },
    applyAura: ({ fighter }) => {
      const levels = [0, 2, 4, 7, 11, 15]
      let numberOfRings = 0
      for (let i = 0; i < fighter.itemIndexes.length; i++) {
        if (items[fighter.itemIndexes[i]].ring) {
          numberOfRings++
        }
      }
      numberOfRings = Math.min(numberOfRings, 5)
      fighter.bonusInt += levels[numberOfRings]
    },
  },
  // cerveny ochranca
  {
    image: require('./assets/items/rapier.png'),
    title: 'Červený ochranca',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      if (
        (fighter.race === RACES.WARRIOR ||
          fighter.race === RACES.HUNTER ||
          fighter.race === RACES.SYMBIONT) &&
        fighter.manaPool >= 2
      ) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      const manaCost = 2
      for (const f of state.fighters) {
        f.bonusPower += 2
      }
      fighter.manaPool -= manaCost
    },
  },
  // modry agresor
  {
    image: require('./assets/items/rapier.png'),
    title: 'Modrý agresor',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      if (
        (fighter.race === RACES.WARRIOR ||
          fighter.race === RACES.HUNTER ||
          fighter.race === RACES.SYMBIONT) &&
        fighter.manaPool >= 2
      ) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      const manaCost = 2
      for (const f of state.fighters) {
        f.bonusAgi += 2
      }
      fighter.manaPool -= manaCost
    },
  },
  // vodny elemental
  {
    image: require('./assets/items/rapier.png'),
    title: 'Vodný elementál',
    type: SPELL,
    rarity: RARITIES.UNCOMMON,
    chooseAttribute: [true, true, false],
    isEnabled: ({ fighter }) => {
      if (
        (fighter.race === RACES.PRIEST ||
          fighter.race === RACES.WARLOCK ||
          fighter.race === RACES.MAGE) &&
        fighter.manaPool >= 6
      ) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state, attribute }) => {
      const elemental = createDefaultFighter({
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.WATER_ELEMENTAL,
      })
      if (attribute === ATTRIBUTES.POWER) {
        elemental.power = 12
      } else if (attribute === ATTRIBUTES.AGILITY) {
        elemental.agi = 12
      }
      addFighter(elemental, state)
      fighter.manaPool -= 6
    },
  },
  // motlidba
  {
    image: require('./assets/items/rapier.png'),
    title: 'Motlitba',
    type: SPELL,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.PRIEST) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter }) => {
      fighter.manaPool += 8
      fighter.bonusInt += 16
    },
  },
  // zvitok naplnenia
  {
    image: require('./assets/items/rapier.png'),
    title: 'Zvitok naplnenia',
    type: SPELL,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      if (fighter.manaPool >= 1) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      fighter.manaPool -= 1
      for (const f of state.fighters) {
        if (f.race <= LAST_HERO_INDEX) {
          f.manaPool += 5
        }
      }
    },
  },
  // puska
  {
    image: require('./assets/items/rapier.png'),
    title: 'Puška',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.HUNTER || fighter.race === RACES.SYMBIONT) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 10
    },
    onInvoke: ({ fighter, state }) => {
      for (const monster of state.creatures) {
        agiDmg(monster, 3, state)
      }
    },
  },
  // kuzelna palicka
  {
    image: require('./assets/items/rapier.png'),
    title: 'Kúzelná palička',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.MAGE) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusInt += 14
    },
  },
  {
    image: require('./assets/items/frostmourne.jpg'),
    title: 'Mrazivý smútok',
    passive: true,
    maxLevel: 10000000,
    applyAura: ({ fighter, index }) => {
      const level = fighter.itemLevels[index]
      fighter.bonusPower += 5 + level * 3
      fighter.bonusAgi += 5 + level * 3
    },
    isEnabled: ({ fighter }) => fighter.race === RACES.WARRIOR,
  },
  {
    image: require('./assets/items/rapier.png'),
    title: 'Božský rapier',
    passive: true,
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 80
    },
    isEnabled: ({ fighter }) => fighter.race === RACES.HUNTER || fighter.race === RACES.WARRIOR,
  },
  {
    image: require('./assets/items/black_hole.jpg'),
    title: 'Black hole',
    onInvoke: ({ state }) => {
      state.creatures.splice(1)
      const c = state.creatures[0]
      c.power = 0
      c.agi = 0
      c.int = 0
    },
    isEnabled: ({ fighter }) => fighter.manaPool >= 20,
  },
  {
    title: 'Ohnivý elementál',
    image: require('./assets/items/black_hole.jpg'),
    onInvoke: ({ fighter, state }) => {
      state.creatures.forEach((c) => {
        powerDmg(c, 20, state)
        agiDmg(c, 20, state)
      })
    },
    isEnabled: ({ fighter }) => fighter.race === RACES.WARLOCK && fighter.manaPool >= 22,
  },
  {
    title: 'Pizza quatro formagi',
    image: require('./assets/items/black_hole.jpg'),
    onInvoke: ({ fighter }) => {
      fighter.bonusPower += 30
      fighter.manaPool += 30
    },
  },
  {
    title: 'Amulet zúfalstva',
    passive: true,
    image: require('./assets/items/black_hole.jpg'),
    applyAura: ({ fighter }) => {
      fighter.bonusInt += 15
      fighter.manaPool += 5
    },
  },
  {
    title: 'Maska šialenstva',
    passive: true,
    image: require('./assets/items/black_hole.jpg'),
    applyAura: ({ fighter }) => {
      fighter.bonusPower += 3
      fighter.bonusAgi += 3
      fighter.int -= 5
      fighter.manaPool += 15
    },
    isEnabled: ({ fighter }) => fighter.int > 5,
  },
  {
    title: 'Midasova ruka',
    passive: true,
    image: require('./assets/items/black_hole.jpg'),
  },
  {
    title: 'Krvavý prsteň',
    image: require('./assets/items/black_hole.jpg'),
    onInvoke: ({ fighter }) => {
      fighter.power -= 5
      fighter.manaPool += 15
    },
    isEnabled: ({ fighter }) => fighter.power > 5,
  },
  {
    title: 'Bronnov elfský prsteň',
    image: require('./assets/items/black_hole.jpg'),
    passive: true,
    applyAura: ({ fighter }) => {
      fighter.manaPool += 10
    },
    isEnabled: ({ fighter }) =>
      fighter.race === RACES.MAGE ||
      fighter.race === RACES.PRIEST ||
      fighter.race === RACES.WARLOCK,
  },
  {
    title: 'Orb obnovenia',
    image: require('./assets/items/black_hole.jpg'),
    onInvoke: ({ fighter }) => {
      fighter.spellCasted = fighter.spellCasted.map((_) => false)
    },
    isEnabled: ({ fighter }) =>
      (fighter.race === RACES.MAGE ||
        fighter.race === RACES.PRIEST ||
        fighter.race === RACES.WARLOCK) &&
      fighter.manaPool >= 6,
  },
  {
    title: 'Kameň oživenia',
    image: require('./assets/items/black_hole.jpg'),
    onInvoke: ({ fighter, state }) => {
      // TODO: imageIndex
      addFighter(
        createDefaultFighter({ int: 10, agi: 10, power: 10, nick: 'Prízrak', imageIndex: 0 }),
        state
      )
      fighter.manaPool -= 6
    },
    maxLevel: 10000000,
    isEnabled: ({ fighter, index }) =>
      (fighter.race === RACES.MAGE || fighter.race === RACES.WARLOCK) &&
      fighter.manaPool >= 6 &&
      fighter.itemLevels[index] >= 8,
  },
]
