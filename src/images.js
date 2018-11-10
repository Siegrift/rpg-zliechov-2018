export const creatureImages = [
  { image: require('./assets/creatures/monster0.jpg') },
  { image: require('./assets/creatures/monster1.jpg') },
  { image: require('./assets/creatures/monster2.png') },
  { image: require('./assets/creatures/monster3.jpeg') },
]

// all races have fixed spells (look in initialState.js for index<--->race mapping)
export const raceImages = [
  // TODO: find race images for all races
  [
    { image: require('./assets/races/mage/mage0.png') },
    { image: require('./assets/races/mage/mage1.png') },
    { image: require('./assets/races/mage/mage2.jpg') },
  ],
  [
    { image: require('./assets/races/hunter/hunter0.jpg') },
    { image: require('./assets/races/hunter/hunter1.png') },
  ],
  [{ image: require('./assets/races/hunter/hunter0.jpg')}],
  [{ image: require('./assets/races/hunter/hunter0.jpg')}],
  [{ image: require('./assets/races/hunter/hunter0.jpg')}],
]

export const itemImages = [
  { image: require('./assets/items/agh.jpg'), title: 'Aghanim', onInvoke: (state) => state },
  { image: require('./assets/items/dagon.jpg'), title: 'Dagon', onInvoke: (state) => state },
  { image: require('./assets/items/manta.png'), title: 'Manta', onInvoke: (state) => state },
]

// all races have fixed spells (look in initialState.js for index<--->race mapping)
export const spellImages = [
  // TODO: find spell icons for all races
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (state) => {
        state.fighters[0].power -= 50
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
  ],
  [
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/wex.png'),
      title: 'Wex',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
  ],
  [
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/quas.png'),
      title: 'Quas',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
  ],
  [
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/exort.png'),
      title: 'Exort',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
  ],
  [
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
    {
      image: require('./assets/spells/invoke.jpg'),
      title: 'Invoke',
      onInvoke: (state) => {
        state.fighters[0].power -= 10
      },
    },
  ],
]

export const creatureSpells = [
  {
    image: require('./assets/creatureSpells/fireSword.png'),
    title: 'Fire strike',
    onInvoke: (state) => {
      state.fighters[0].power -= 10
    },
  },
  {
    image: require('./assets/creatureSpells/hidan.png'),
    title: 'Hidan',
    onInvoke: (state) => {
      state.fighters[0].power -= 10
    },
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Sacrifice',
    onInvoke: (state) => {
      state.fighters[0].power -= 10
    },
  },
]

export const addEntityImage = { image: require('./assets/add.png'), title: 'Nový' }
