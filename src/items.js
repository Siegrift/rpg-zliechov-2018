import { int } from './utils'

export const itemImages = [
  {
    image: require('./assets/items/agh.jpg'),
    title: 'Aghanim',
    onInvoke: (fighter) => {
      fighter.power = int(fighter.power) - 50
      fighter.agility += 50
    },
    isEnabled: (fighter) => fighter.power >= 100,
  },
  { image: require('./assets/items/dagon.jpg'), title: 'Dagon', onInvoke: (fighter) => fighter },
  { image: require('./assets/items/manta.png'), title: 'Manta', onInvoke: (fighter) => fighter },
]
