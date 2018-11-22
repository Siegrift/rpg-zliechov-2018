import { powerDmg, agiDmg, intDmg } from './damageHelpers'
import { CHOOSE, RACES, LAST_HERO_INDEX, SUMMONS } from './constants'
import { createDefaultFighter } from './store/initialState'
import { proxyTarget } from './utils'

/*
There are 2 categories of spells (fighter and creature). Both are represented as
array of structurally the same objects. The structure looks as this

{
  image: require(<<path_to_image>>),
  title: <<title>>,
  onInvoke: (current_fighter, current_creature, whole_state) => {
    ...
  },
  isEnabled: (current_fighter, current_creature, whole_state) => {
    ...
  },
}

Required fields of this object are only 'image' and 'title'. Leaving out
onInvoke means no action, and isEnabled means the spell is always available.

To add a new spell, just add an item to the following array and code the logic
of the spell.
*/

// all races have fixed spells (look in initialState.js for index<--->race mapping)
export const fighterSpells = [
  // TODO: find spell icons for all races
  // mage
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Ohnivá guľa',
      onInvoke: (fighter, monster, state) => {
        const spellID = 0
        const levels = [null, 4, 8, 12]
        const manaCost = [null, 1, 3, 6]
        const multicast = fighterSpells[0][3].generateMulticast(fighter)
        let ocista = 0
        if (monster.debuffs.ocista !== undefined) {
          ocista = monster.debuffs.ocista
        }
        for (let i = 0; i < multicast; i++) {
          agiDmg(monster, levels[fighter.spellLevels[spellID]] + ocista, state)
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const spellID = 0
        const manaCost = [null, 1, 3, 6]
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Očista',
      onInvoke: (fighter, monster, state) => {
        const spellID = 1
        const levelsDmg = [null, 2, 5, 8]
        const levelsPow = [null, 4, 10, 16]
        const levelsBuff = [null, 2, 4, 6]
        const manaCost = [null, 2, 5, 9]
        const multicast = fighterSpells[0][3].generateMulticast(fighter)
        for (let i = 0; i < multicast; i++) {
          agiDmg(monster, levelsDmg[fighter.spellLevels[spellID]], state)
          monster.power += levelsPow[fighter.spellLevels[spellID]]
          if (monster.debuffs.ocista === undefined) monster.debuffs.ocista = 0
          monster.debuffs.ocista += levelsBuff[fighter.spellLevels[spellID]]
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const spellID = 1
        const manaCost = [null, 2, 5, 9]
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Tornádo',
      onInvoke: (fighter, monster, state) => {
        const spellID = 2
        const levels = [null, 1, 3, 5]
        const manaCost = [null, 2, 4, 7]
        const multicast = fighterSpells[0][3].generateMulticast(fighter)
        let ocista = 0
        if (monster.debuffs.ocista !== undefined) ocista = monster.debuffs.ocista
        for (let i = 0; i < multicast; i++) {
          powerDmg(monster, levels[fighter.spellLevels[spellID]], state)
          agiDmg(monster, levels[fighter.spellLevels[spellID]] + ocista, state)
          intDmg(monster, levels[fighter.spellLevels[spellID]], state)
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const spellID = 2
        const manaCost = [null, 2, 4, 7]
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Multicast',
      passive: true,
      generateMulticast: (fighter) => {
        const spellID = 3
        if (fighter.spellLevels[spellID] === 0) return 1
        const randomValue = Math.random()
        if (randomValue < 1 / 6) return 3
        if (randomValue < 1 / 3) return 2
        return 1
      },
      onInvoke: (fighter) => {},
      isEnabled: (fighter) => {
        const spellID = 2
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
    },
  ],
  // hunter
  [
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (figther, creature, state) => {
        const f = createDefaultFighter()
        f.race = RACES.MORPH
        state.fighters.push(f)
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
  ],
  // priest
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Ľadové objatie',
      chooseAlly: CHOOSE.UNIT,
      onInvoke: (fighter, monster, state, select) => {
        console.log(
          proxyTarget(fighter),
          proxyTarget(monster),
          proxyTarget(state),
          proxyTarget(select)
        )
        const spellID = 0
        const manaCost = [null, 1, 4, 7]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const spellID = 0
        const manaCost = [null, 1, 4, 7]
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
  ],
  // warlock
  [
    {
      image: require('./assets/spells/exort.png'),
      title: 'Vyvolaj zombie',
      onInvoke: (fighter, monster, state) => {
        const spellID = 0
        const manaCost = [null, 1, 4, 8]
        const levels = [null, 4, 8, 12]
        const f = createDefaultFighter()
        f.race = RACES.UNIT_WITHOUT_SPELLS
        f.imageIndex = SUMMONS.ZOMBIE
        console.log(f.race, f.imageIndex)
        state.fighters.push(f)
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const manaCost = [null, 1, 4, 8]
        const spellID = 0
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
  ],
  // warrior
  [
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Vzrušenie z boja',
      onInvoke: (fighter) => {
        const levels = [null, 2, 2.5, 3]
        const manaCost = [null, 1, 1, 1]
        const spellID = 0
        fighter.power *= levels[fighter.spellLevels[spellID]]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const manaCost = [null, 1, 1, 1]
        const spellID = 0
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Posilnenie',
      onInvoke: (fighter) => {
        const levels = [null, 3, 6, 9]
        const manaCost = [null, 1, 1, 2]
        const spellID = 1
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return
        }
        fighter.power += levels[fighter.spellLevels[spellID]]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const manaCost = [null, 1, 1, 2]
        const spellID = 1
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Zdravé sebavedomie',
      passive: true,
      onInvoke: (fighter, monster, state) => {
        const spellID = 2
        const levels = [null, 1.5, 3, 5]
        let add_bonus_power = 0
        for (const f of state.fighters) {
          if (
            f.race <= LAST_HERO_INDEX &&
            f.power + f.bonusPower < fighter.power + fighter.bonusPower
          ) {
            add_bonus_power += levels[fighter.spellLevels[spellID]]
          }
        }
        fighter.bonusPower += add_bonus_power
      },
      isEnabled: (fighter) => {
        const spellID = 2
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Bojový pokrik',
      onInvoke: (fighter, monster, state) => {
        const spellID = 3
        const manaCost = [null, 5]
        const levels = [null, 4]
        for (const f of state.fighters) {
          f.bonusPower += levels[fighter.spellLevels[spellID]]
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: (fighter) => {
        const spellID = 3
        const manaCost = [null, 5]
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return false
        }
        return true
      },
    },
  ],
  // symbiont
  [
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (figther, c) => {
        c.power -= 10
      },
    },
  ],
  // summon without spells
  [],
]

export const creatureSpells = [
  {
    image: require('./assets/creatureSpells/fireSword.png'),
    title: 'Fire strike',
    onInvoke: (figther) => {
      figther.power -= 10
    },
    desc:
      'Fire strike has hit bla bla and this caused and immerse pain to bla bla so this resulte in this buff...',
  },
  {
    image: require('./assets/creatureSpells/hidan.png'),
    title: 'Hidan',
    onInvoke: (figther) => {
      figther.power -= 10
    },
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas. Vel fringilla est ullamcorper eget nu',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Sacrifice',
    onInvoke: (figther) => {
      figther.power -= 10
    },
    desc: 'Lorem ipsum dolor sit amet',
  },
]
