import { int } from './utils'

/*
Contains all items in a game. To add a new array look at './spells.js'.
The item object is structurally similar to 'spell' object.
*/

export const items = [
  {
    image: require('./assets/items/agh.jpg'),
    title: 'Aghanim',
    onInvoke: (fighter) => {
      fighter.power = int(fighter.power) - 50
      fighter.agi += 50
    },
    isEnabled: (fighter) => fighter.power >= 100,
  },
  {
    image: require('./assets/items/dagon.jpg'),
    title: 'Dagon',
    onInvoke: (fighter) => {
      fighter.power = int(fighter.power) + 50
    },
    isEnabled: (fighter) => true,
  },
  {
    image: require('./assets/items/manta.png'),
    title: 'Manta',
    onInvoke: (fighter) => {
      fighter.power = int(fighter.power) + 50
    },
    isEnabled: (fighter) => true,
  },
]
