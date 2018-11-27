/*
Contains all items in a game. To add a new array look at './spells.js'.
The item object is structurally similar to 'spell' object.
*/

const loadItem = (item) => require(`./assets/items/${item}`)

export const items = [
  {
    image: loadItem('agh.jpg'),
    title: 'Aghanim',
    onInvoke: ({ fighter }) => {
      fighter.power = fighter.power - 50
      fighter.agi += 50
    },
    isEnabled: ({ fighter }) => fighter.power >= 100,
  },
  {
    image: loadItem('dagon.jpg'),
    title: 'Dagon',
    onInvoke: ({ fighter }) => {
      fighter.power = fighter.power + 50
    },
    isEnabled: ({ fighter }) => true,
  },
  {
    image: loadItem('manta.png'),
    title: 'Manta',
    onInvoke: ({ fighter }) => {
      fighter.power = fighter.power + 50
    },
    isEnabled: ({ fighter }) => true,
  },
  {
    image: loadItem('frostmourne.jpg'),
    title: 'Mrazivý smútok',
    onInvoke: ({ fighter, index }) => {
      const level = fighter.itemLevels[index]
      fighter.bonusPower += 5 + (level - 1) * 3
      fighter.bonusAgi += 5 + (level - 1) * 3
    },
  },
  {
    image: loadItem('rapier.png'),
    title: 'Božský rapier',
    onInvoke: ({ fighter }) => {
      fighter.bonusAgi += 80
    },
  },
  {
    image: loadItem('black_hole.jpg'),
    title: 'Black hole',
    onInvoke: ({ state }) => {
      state.creatures = []
    },
    isEnabled: ({ fighter }) => fighter.manaPool >= 20,
  },
]

export const itemTypes = ['Bežné', 'Vzácne', 'Legendárne', 'Prastaré']
