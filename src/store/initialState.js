export const createDefaultFighter = () => ({
  nick: '',
  race: 0, // (0, 1, 2, 3, 4) = (Mág, Lovec, Kňaz, Černokňažník, Bojovník)
  level: '',
  power: '',
  agility: '',
  intelligence: '',
  spellLevels: [1, 1, 1, 1],
  items: [],
  imageIndex: -1,
})

const state = {
  creature: {
    name: '',
    power: '',
    agility: '',
    intelligence: '',
    requirements: [],
    imageIndex: -1,
  },
  fighters: [createDefaultFighter()],
  page: 'create',
}

export default () => state
