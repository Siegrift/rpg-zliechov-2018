export const createDefaultFighter = (mul = 1) => ({
  nick: 'Mock',
  race: 0, // (0, 1, 2, 3, 4) = (Mág, Lovec, Kňaz, Černokňažník, Bojovník)
  level: '2',
  power: `${mul * 100}`,
  agility: `${mul * 100}`,
  intelligence: `${mul * 100}`,
  spellLevels: [1, 1, 1, 1],
  items: [0, 1, 0, 0, 2, 1],
  imageIndex: 1,
})

export const createDefaultCreature = () => ({
  name: 'Dedo',
  power: '250',
  agility: '400',
  intelligence: '500',
  requirements: [],
  spellIndexes: [0, 1, 0],
  imageIndex: 2,
})

const state = {
  creatures: [createDefaultCreature()],
  fighters: [createDefaultFighter(2), createDefaultFighter()],
  page: 'create',
}

export default () => state
