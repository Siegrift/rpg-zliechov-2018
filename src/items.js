import { powerDmg, agiDmg, addFighter, setFightersChief, removeFighter } from './helpers'
import { RACES, LAST_HERO_INDEX, SUMMONS, ATTRIBUTES, MAX_SPELL_LEVELS } from './constants'
import { createDefaultFighter } from './store/initialState'
import { proxyTarget } from './utils'

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
    onInvoke: () => {},
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
        nick: 'Vzdušný elementál',
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
    onInvoke: () => {},
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
    onInvoke: () => {},
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
    onInvoke: () => {},
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
    onInvoke: () => {},
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
    onInvoke: () => {},
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
    onInvoke: () => {},
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
  // cervena ochrana
  {
    image: require('./assets/items/rapier.png'),
    title: 'Červená ochrana',
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
  // modra agresia
  {
    image: require('./assets/items/rapier.png'),
    title: 'Modrá agresia',
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
        nick: 'Vodný elementál',
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
  // ostep
  {
    image: require('./assets/items/rapier.png'),
    title: 'Oštep',
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
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.MAGE) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusInt += 14
    },
    onInvoke: () => {},
  },
  // roba bieleho maga
  {
    image: require('./assets/items/rapier.png'),
    title: 'Róba bieleho mága',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.MAGE || fighter.race === RACES.PRIEST || fighter.race === RACES.WARLOCK) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusPower += 6
      fighter.bonusAgi += 6
      fighter.bonusInt += 6
    },
    onInvoke: () => {},
  },
  // elixir many
  {
    image: require('./assets/items/rapier.png'),
    title: 'Elixír many',
    type: SPELL,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      return true
    },
    onInvoke: ({ fighter, state }) => {
      fighter.manaPool += 20
    },
  },
  // tajomny trpaslici prsten
  {
    image: require('./assets/items/rapier.png'),
    title: 'Tajomný trpasličí prsteň',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    passive: true,
    ring: true,
    isEnabled: ({ fighter }) => {
      return true
    },
    applyAura: ({ fighter }) => {
      const levels = [0, 0, 1, 1, 2, 2]
      let numberOfRings = 0
      for (let i = 0; i < fighter.itemIndexes.length; i++) {
        if (items[fighter.itemIndexes[i]].ring) {
          numberOfRings++
        }
      }
      numberOfRings = Math.min(numberOfRings, 5)
      for (let i = 0; i < numberOfRings; i++) {
        let upgradableSpells = []
        for (let j = 0; j < fighter.spellLevels.length; j++) {
          if (fighter.spellLevels[j] < MAX_SPELL_LEVELS[j]) {
            upgradableSpells.push(j)
          }
        }
        if (upgradableSpells.length > 0) {
          fighter.spellLevels[upgradableSpells[Math.floor(Math.random() * upgradableSpells.length)]]++
        }
      }
    },
  },
  // svietiaci mec
  {
    image: require('./assets/items/rapier.png'),
    title: 'Svietiaci meč',
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    isEnabled: ({ fighter }) => {
      return true
    },
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 8
    },
    onInvoke: ({ fighter, creature, state }) => {
      agiDmg(creature, 2 * fighter.manaPool, state)
      fighter.manaPool -= Math.ceil(fighter.manaPool / 3)
    },
  },
  // necronomicon
  {
    image: require('./assets/items/rapier.png'),
    title: 'Necronomicon',
    type: SPELL,
    rarity: RARITIES.LEGENDARY,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.WARLOCK) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state, attribute }) => {
      const demonWarrior = createDefaultFighter({
        nick: 'Kostlivec',
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.DEMON_WARRIOR,
        power: 12,
        agi: 12,
        int: 5,
      })
      addFighter(demonWarrior, state)
    },
  },
  // golemov sem
  {
    image: require('./assets/items/rapier.png'),
    title: 'Golemov šém',
    type: SPELL,
    rarity: RARITIES.LEGENDARY,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.WARLOCK && fighter.manaPool >= 7) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      const golem = createDefaultFighter({
        nick: 'Golem',
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.GOLEM,
        power: 20,
        agi: 10,
      })
      fighter.manaPool -= 7
      addFighter(golem, state)
    },
  },
  // polymorph
  {
    image: require('./assets/items/rapier.png'),
    title: 'Polymorph',
    type: SPELL,
    rarity: RARITIES.LEGENDARY,
    isEnabled: ({ fighter }) => {
      if (fighter.manaPool >= 4) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, creature }) => {
      creature.power = 50
      creature.agi = 50
      creature.int = 50
      fighter.manaPool -= 4
    },
  },
  // iluzionista
  {
    image: require('./assets/items/rapier.png'),
    title: 'Iluzionista',
    type: SPELL,
    rarity: RARITIES.LEGENDARY,
    isEnabled: ({ fighter }) => {
      if (fighter.manaPool >= 5) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      const illusion = createDefaultFighter({
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.ILLUSION,
        nick: 'Ilúzia ' + fighter.nick,
        power: Math.ceil(fighter.power / 2),
        agi: Math.ceil(fighter.agi / 2),
        int: Math.ceil(fighter.int / 2),
      })
      fighter.manaPool -= 5
      addFighter(illusion, state)
    },
  },
  // luk z dracej kosti
  {
    image: require('./assets/items/rapier.png'),
    title: 'Luk z dračej kosti',
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    passive: true,
    isEnabled: ({ fighter }) => {
      if (fighter.race === RACES.HUNTER || fighter.race === RACES.SYMBIONT) {
        return true
      }
      return false
    },
    applyAura: ({ fighter }) => {
      fighter.bonusAgi += 17
    },
    combatModifier: (fighter, attributes) => {
      if (Math.random() < 0.33) {
        attributes.agi += 15
      }
      return attributes
    },
    onInvoke: () => {},
  },
  // klonovanie
  {
    image: require('./assets/items/rapier.png'),
    title: 'Klonovanie',
    type: SPELL,
    rarity: RARITIES.ANCIENT,
    isEnabled: ({ fighter }) => {
      if (fighter.manaPool >= 10) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, state }) => {
      const clone = createDefaultFighter({
        race: fighter.race,
        spellLevels: fighter.spellLevels,
        imageIndex: fighter.imageIndex,
        nick: fighter.nick,
        level: fighter.level,
        power: fighter.power,
        agi: fighter.agi,
        int: fighter.int,
        manaPool: fighter.int,
      })
      fighter.manaPool -= 10
      addFighter(clone, state)
    },
  },
  // kamen ozivenia
  {
    image: require('./assets/items/frostmourne.jpg'),
    title: 'Kameň oživenia',
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    maxLevel: 10000000,
    hallows: 'stone',
    isEnabled: ({ fighter, index }) => {
      if ((fighter.race === RACES.WARLOCK || fighter.race === RACES.MAGE) &&
        fighter.manaPool >= 3 && fighter.itemLevels[index] >= 9) {
        return true
      }
      return false
    },
    onInvoke: ({ fighter, index, state }) => {
      const level = fighter.itemLevels[index]
      const spectre = createDefaultFighter({
        nick: 'Prízrak',
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.SPECTRE,
        power: 13,
        agi: 13,
        int: 13,
      })
      addFighter(spectre, state)
      fighter.manaPool -= 3
      fighter.itemLevels[index] -= 8
      fighter.itemCasted[index] = false
    },
  },
  // prsten moci
  {
    image: require('./assets/items/frostmourne.jpg'),
    title: 'Prsteň moci',
    type: ITEM,
    ring: true,
    rarity: RARITIES.ANCIENT,
    isEnabled: ({ fighter }) => {
      return true
    },
    applyAura: ({ fighter }) => {
      fighter.bonusInt -= 8
    },
    onInvoke: ({ fighter, state }) => {
      const nazgul = createDefaultFighter({
        nick: 'Nazgûl',
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.NAZGUL,
        power: 16,
        agi: 16,
        int: 16,
      })
      addFighter(nazgul, state)
    }
  },
  // mrazivy smutok
  {
    image: require('./assets/items/frostmourne.jpg'),
    title: 'Mrazivý smútok',
    passive: true,
    maxLevel: 10000000,
    type: ITEM,
    rarity: RARITIES.ANCIENT,
    applyAura: ({ fighter, index }) => {
      const level = fighter.itemLevels[index]
      fighter.bonusPower += 10 + level * 5
      fighter.bonusAgi += 10 + level * 5
    },
    isEnabled: ({ fighter }) => fighter.race === RACES.WARRIOR,
  },
  // bozsky rapier
  {
    image: require('./assets/items/rapier.png'),
    title: 'Božský rapier',
    type: ITEM,
    rarity: RARITIES.ANCIENT,
    passive: true,
    combatModifier: (fighter, attributes) => {
      fighter.buffs.willDie = true
      attributes.agi += 120
      return attributes
    },
    isEnabled: ({ fighter, state }) => {
      if ((fighter.race === RACES.HUNTER || fighter.race === RACES.WARRIOR) && state.fighters.length > 1) {
        return true
      }
      return false
    }
  },
  // zemetrasenie
  {
    image: require('./assets/items/black_hole.jpg'),
    title: 'Zemetrasenie',
    type: SPELL,
    rarity: RARITIES.ANCIENT,
    onInvoke: ({ fighter, state }) => {
      state.creatures.splice(1)
      const c = state.creatures[0]
      c.power = 0
      c.agi = 0
      c.int = 0
      fighter.manaPool -= 20
    },
    isEnabled: ({ fighter }) => fighter.manaPool >= 20,
  },
  // drak
  {
    title: 'Drak',
    image: require('./assets/items/black_hole.jpg'),
    type: SPELL,
    rarity: RARITIES.ANCIENT,
    onInvoke: ({ fighter, state }) => {
      state.creatures.forEach((monster) => {
        powerDmg(monster, 20, state)
        agiDmg(monster, 20, state)
      })
      const fireElemental = createDefaultFighter({
        nick: 'Ohnivý elementál',
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.FIRE_ELEMENTAL,
        agi: 15,
      })
      addFighter(fireElemental, state)
    },
    isEnabled: ({ fighter }) => fighter.race === RACES.WARLOCK && fighter.manaPool >= 16,
  },
  // odvar zivych mrtvych
  {
    title: 'Odvar živých mŕtvych',
    image: require('./assets/items/black_hole.jpg'),
    type: SPELL,
    rarity: RARITIES.LEGENDARY,
    onInvoke: ({ fighter }) => {
      fighter.bonusPower += 30
      fighter.manaPool += 30
    },
  },
  // mec z valyrie
  {
    title: 'Meč z Valýrie',
    passive: true,
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    image: require('./assets/items/black_hole.jpg'),
    combatModifier: (fighter, attributes) => {
      attributes.power += 20
      attributes.agi += 15
      return attributes
    }
  },
  // maska sialenstva
  {
    title: 'Maska šialenstva',
    passive: true,
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    image: require('./assets/items/black_hole.jpg'),
    applyAura: ({ fighter }) => {
      fighter.bonusPower += 10
      fighter.bonusAgi += 10
      fighter.int -= 5
      fighter.manaPool += 15
    },
    isEnabled: ({ fighter }) => fighter.int > 5,
  },
  // midasova rukavica
  {
    title: 'Midasova rukavica',
    passive: true,
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    image: require('./assets/items/black_hole.jpg'),
    applyAura: ({ state }) => {
      state.creatures[0].rewardItems[RARITIES.UNCOMMON]++
    },
    isEnabled: ({}) => true
  },
  // krvavy amulet
  {
    title: 'Krvavý amulet',
    image: require('./assets/items/black_hole.jpg'),
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    onInvoke: ({ fighter }) => {
      fighter.power -= 5
      fighter.manaPool += 25
    },
    isEnabled: ({ fighter }) => fighter.power > 5,
  },
  // bronnov elfsky prsten
  {
    title: 'Bronnov elfský prsteň',
    image: require('./assets/items/black_hole.jpg'),
    passive: true,
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    ring: true,
     applyAura: ({ fighter }) => {
      const levels = [0, 8, 10, 13, 17, 22]
      let numberOfRings = 0
      for (let i = 0; i < fighter.itemIndexes.length; i++) {
        if (items[fighter.itemIndexes[i]].ring) {
          numberOfRings++
        }
      }
      numberOfRings = Math.min(numberOfRings, 5)
      fighter.manaPool += levels[numberOfRings]
    },
    isEnabled: ({ fighter }) =>
      fighter.race === RACES.MAGE ||
      fighter.race === RACES.PRIEST ||
      fighter.race === RACES.WARLOCK,
  },
  // obr obnovenia
  {
    title: 'Orb obnovenia',
    image: require('./assets/items/black_hole.jpg'),
    type: ITEM,
    rarity: RARITIES.LEGENDARY,
    onInvoke: ({ fighter }) => {
      fighter.spellCasted = fighter.spellCasted.map((_) => false)
      fighter.manaPool -= 6
    },
    isEnabled: ({ fighter }) =>
      (fighter.race === RACES.MAGE ||
        fighter.race === RACES.PRIEST ||
        fighter.race === RACES.WARLOCK) &&
      fighter.manaPool >= 6,
  },
  // neviditelny plast
  {
    title: 'Neviditeľný plášť',
    image: require('./assets/items/black_hole.jpg'),
    type: ITEM,
    rarity: RARITIES.UNCOMMON,
    hallows: 'cloak',
    onInvoke: ({ fighter, state }) => {
      removeFighter(fighter, state)
    },
    isEnabled: ({ fighter, state }) => {
      let numberOfHeroes = 0
      for (const fighter of state.fighters) {
        if (fighter.race <= LAST_HERO_INDEX) {
          numberOfHeroes++
        }
      }
      if (fighter.manaPool >= 3 && numberOfHeroes > 1) {
        return true
      }
      return false
    },
  },
  // bazovy prutik
  {
    title: 'Bazový prútik',
    passive: true,
    type: ITEM,
    rarity: RARITIES.ANCIENT,
    image: require('./assets/items/black_hole.jpg'),
    hallows: 'wand',
    combatModifier: (fighter, attributes) => {
      let refreshableSpells = []
      for (let i = 1; i < fighter.spellLevels.length; i++) {
        if (fighter.spellCasted[i]) {
          refreshableSpells.push(i)
        }
      }
      if (refreshableSpells.length > 0) {
        fighter.spellCasted[refreshableSpells[Math.floor(Math.random() * refreshableSpells.length)]] = false
      }
      if (Math.random() < 0.5) {
        fighter.spellCasted[0] = false
      }
      return attributes
    },
    applyAura: ({ fighter }) => {
      fighter.bonusInt += 10
      fighter.manaPool += 10
    },
    isEnabled: ({ fighter }) => fighter.race === RACES.MAGE || fighter.race === RACES.PRIEST,
  },
  // pan smrti
  {
    title: 'Pán smrti',
    image: require('./assets/items/black_hole.jpg'),
    type: SPELL,
    rarity: RARITIES.ANCIENT,
    onInvoke: ({ fighter, state }) => {
      const death = createDefaultFighter({
        nick: 'Smrť',
        race: RACES.UNIT_WITHOUT_SPELLS,
        imageIndex: SUMMONS.DEATH,
        power: 10,
        agi: 40,
        int: 40,
      })
      addFighter(death, state)
    },
    isEnabled: ({ fighter }) => {
      let hallows = []
      for (let i = 0; i < fighter.itemIndexes.length; i++) {
        if (items[fighter.itemIndexes[i]].hallows) {
          hallows.push(items[fighter.itemIndexes[i]].hallows)
        }
      }
      console.log(hallows)
      if (hallows.includes('cloak') && hallows.includes('stone') && hallows.includes('wand')) {
        return true
      }
      return false
    },
  },
]
