import { int } from './utils'
import { powerDmg } from './damageHelpers'

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
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (figther) => {
        figther.power = int(figther.power) + 50
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (figther) => {
        figther.agi = int(figther.agi) + 50
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (figther) => {
        figther.int = int(figther.int) + 50
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
  [
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
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (figther) => {
        figther.power -= 10
      },
    },
  ],
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
]

export const creatureSpells = [
  {
    image: require('./assets/creatureSpells/fireSword.png'),
    title: 'Fire strike',
    onInvoke: (figther) => {
      figther.power -= 10
    },
  },
  {
    image: require('./assets/creatureSpells/hidan.png'),
    title: 'Hidan',
    onInvoke: (figther) => {
      figther.power -= 10
    },
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Sacrifice',
    onInvoke: (figther) => {
      figther.power -= 10
    },
  },
]
