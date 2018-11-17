import { powerDmg } from './damageHelpers'
import { CHOOSE, RACES } from './constants'
import { createDefaultFighter } from './store/initialState'

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
      title: 'Quas',
      chooseAlly: CHOOSE.OTHER_UNIT,
      onInvoke: (figther) => {
        figther.power = figther.power + 50
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      chooseEnemy: CHOOSE.ATTRIBUTE,
      onInvoke: (figther) => {
        figther.agi = figther.agi + 50
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (figther) => {
        figther.int = figther.int + 50
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (figther, creature) => {
        powerDmg(creature, 10)
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
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
  ],
  // black priest
  [
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
      title: 'Invoke',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
  ],
  // summons
  [
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (figther, c) => {
        c.power -= 10
      },
    },
  ],
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
