export const creatureImages = [
  { image: require('./assets/creatures/monster0.jpg') },
  { image: require('./assets/creatures/monster1.jpg') },
  { image: require('./assets/creatures/monster2.png') },
  { image: require('./assets/creatures/monster3.jpeg') },
  { image: require('./assets/creatures/monster4.jpg') },
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
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
]

export const addUnitImage = { image: require('./assets/add.png'), title: 'Nový' }
