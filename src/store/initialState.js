// eslint-disable-next-line
const mockedState = {
  creatures: [
    {
      name: 'Mocked creature',
      power: '250',
      agility: '100',
      intelligence: '150',
      requirements: ['At least 5'],
      spellIndexes: [0, 1],
      imageIndex: 2,
    },
  ],
  fighters: [
    {
      nick: 'Arabella',
      race: 0,
      level: '2',
      power: '50',
      agility: '50',
      intelligence: '50',
      spellLevels: [1, 1, 1, 1],
      items: [0],
      imageIndex: 1,
    },
    {
      nick: 'Berserk',
      race: 1,
      level: '2',
      power: '70',
      agility: '70',
      intelligence: '70',
      spellLevels: [1, 1, 1, 1],
      items: [1, 2],
      imageIndex: 0,
    },
  ],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'create',
}

export const createDefaultFighter = (mul = 1) => ({
  nick: '',
  race: 0, // (0, 1, 2, 3, 4) = (Mág, Lovec, Kňaz, Černokňažník, Bojovník)
  level: '1',
  power: '',
  agility: '',
  intelligence: '',
  spellLevels: [1, 1, 1, 1],
  items: [0],
  imageIndex: 0,
})

export const createDefaultCreature = () => ({
  name: '',
  power: '',
  agility: '',
  intelligence: '',
  requirements: [],
  spellIndexes: [],
  imageIndex: 0,
})

const state = {
  // creatures[0] MUST be the one original
  creatures: [createDefaultCreature()],
  fighters: [createDefaultFighter(2), createDefaultFighter()],
  selectedCreature: 0,
  selectedFighter: 0,
  page: 'create',
}

export default () => mockedState
