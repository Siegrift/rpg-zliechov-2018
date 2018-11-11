import { int } from './utils'

// all races have fixed spells (look in initialState.js for index<--->race mapping)
export const spellImages = [
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
        figther.agility = int(figther.agility) + 50
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (figther) => {
        figther.intelligence = int(figther.intelligence) + 50
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
