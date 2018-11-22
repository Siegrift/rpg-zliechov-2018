import { powerDmg, agiDmg, intDmg } from './damageHelpers'
import { CHOOSE, RACES, LAST_HERO_INDEX, SUMMONS } from './constants'
import { createDefaultFighter } from './store/initialState'
// eslint-disable-next-line
import { proxyTarget } from './utils'

/*
There are 2 categories of spells (fighter and creature). Both are represented as
array of structurally the same objects. The structure looks as this

{
  image: require(<<path_to_image>>),
  title: <<string>>,
  onInvoke: ({
    fighter: <<selected fighter>>,
    creature: <<selected creature>>,
    state: <<whole state>>
    attribute: <<index of chosen attribute (if any)>>
    chosen <<chosen object (from CHOOSE in ./constants)>>
  }) => {
    ...
  },
  isEnabled: ({
    fighter: <<selected fighter>>,
    creature: <<selected creature>>,
    state: <<whole state>>
  }) => {
    ...
  },
  passive: <<bool>>,
}

Required fields of this object are only 'image' and 'title'. Leaving out
onInvoke means no action, and isEnabled means the spell is always available and
passive defaults to false.

To add a new spell, just add an item to the following array and code the logic
of the spell.
*/

export const fighterSpells = [
  // TODO: find spell icons for all races
  // mage
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Ohnivá guľa',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 0
        const levels = [null, 4, 8, 12]
        const manaCost = [null, 1, 3, 6]
        const multicast = fighterSpells[0][3].generateMulticast(fighter)
        let ocista = 0
        if (creature.debuffs.ocista !== undefined) {
          ocista = creature.debuffs.ocista
        }
        for (let i = 0; i < multicast; i++) {
          agiDmg(creature, levels[fighter.spellLevels[spellID]] + ocista, state)
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 1
        const levelsDmg = [null, 2, 5, 8]
        const levelsPow = [null, 4, 10, 16]
        const levelsBuff = [null, 2, 4, 6]
        const manaCost = [null, 2, 5, 9]
        const multicast = fighterSpells[0][3].generateMulticast(fighter)
        for (let i = 0; i < multicast; i++) {
          agiDmg(creature, levelsDmg[fighter.spellLevels[spellID]], state)
          creature.power += levelsPow[fighter.spellLevels[spellID]]
          if (creature.debuffs.ocista === undefined) creature.debuffs.ocista = 0
          creature.debuffs.ocista += levelsBuff[fighter.spellLevels[spellID]]
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 2
        const levels = [null, 1, 3, 5]
        const manaCost = [null, 2, 4, 7]
        const multicast = fighterSpells[0][3].generateMulticast(fighter)
        let ocista = 0
        if (creature.debuffs.ocista !== undefined) ocista = creature.debuffs.ocista
        for (let i = 0; i < multicast; i++) {
          powerDmg(creature, levels[fighter.spellLevels[spellID]], state)
          agiDmg(creature, levels[fighter.spellLevels[spellID]] + ocista, state)
          intDmg(creature, levels[fighter.spellLevels[spellID]], state)
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter }) => {
        // TODO:
      },
      isEnabled: ({ fighter }) => {
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
      chooseAttribute: [1, 0, 1],
      onInvoke: ({ fighter, creature, state, attribute }) => {
        state.fighters.push(
          createDefaultFighter({
            nick: 'Axaxa',
            race: RACES.UNIT_WITHOUT_SPELLS,
            spellLevels: [],
            spellCasted: [],
          })
        )
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
  ],
  // priest
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Ľadové objatie',
      chooseAlly: CHOOSE.UNIT,
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 0
        const manaCost = [null, 1, 4, 7]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
  ],
  // warlock
  [
    {
      image: require('./assets/spells/exort.png'),
      title: 'Vyvolaj zombie',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 0
        const manaCost = [null, 1, 4, 8]
        const levels = [null, 4, 8, 12]
        const f = createDefaultFighter()
        f.race = RACES.UNIT_WITHOUT_SPELLS
        f.imageIndex = SUMMONS.ZOMBIE
        f.power = levels[fighter.spellLevels[spellID]]
        state.fighters.push(f)
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      title: 'Vyvolaj démona',
      onInvoke: (fighter, monster, state) => {
        const spellID = 1
        const manaCost = [null, 1, 7, 12]
        const levelsInt = [null, 1, 3, 5]
        const levelsAgi = [null, 3, 6, 9]
        const f = createDefaultFighter()
        f.race = RACES.UNIT_WITHOUT_SPELLS
        f.imageIndex = SUMMONS.DEMON
        console.log(f.race, f.imageIndex)
        f.int = levelsInt[fighter.spellLevels[spellID]]
        f.agi = levelsAgi[fighter.spellLevels[spellID]]
        state.fighters.push(f)
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]

      },
      isEnabled: (fighter) => {
        const manaCost = [null, 1, 7, 12]
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
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: ({ fighter }) => {
        fighter.power -= 10
      },
    },
  ],
  // warrior
  [
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Vzrušenie z boja',
      onInvoke: ({ fighter }) => {
        const levels = [null, 2, 2.5, 3]
        const manaCost = [null, 1, 1, 1]
        const spellID = 0
        fighter.power *= levels[fighter.spellLevels[spellID]]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter }) => {
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
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 2
        const levels = [null, 1.5, 3, 5]
        let addBonusPower = 0
        for (const f of state.fighters) {
          if (
            f.race <= LAST_HERO_INDEX &&
            f.power + f.bonusPower < fighter.power + fighter.bonusPower
          ) {
            addBonusPower += levels[fighter.spellLevels[spellID]]
          }
        }
        fighter.bonusPower += addBonusPower
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 3
        const manaCost = [null, 5]
        const levels = [null, 4]
        for (const f of state.fighters) {
          f.bonusPower += levels[fighter.spellLevels[spellID]]
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
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
      onInvoke: ({ fighter, creature }) => {
        creature.power -= 10
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
    onInvoke: ({ fighter }) => {
      fighter.power -= 10
    },
    desc:
      'Fire strike has hit bla bla and this caused and immerse pain to bla bla so this resulte in this buff...',
  },
  {
    image: require('./assets/creatureSpells/hidan.png'),
    title: 'Hidan',
    onInvoke: ({ fighter }) => {
      fighter.power -= 10
    },
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas. Vel fringilla est ullamcorper eget nu',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Sacrifice',
    onInvoke: ({ fighter }) => {
      fighter.power -= 10
    },
    desc: 'Lorem ipsum dolor sit amet',
  },
]
