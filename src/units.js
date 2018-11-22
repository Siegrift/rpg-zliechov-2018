/*
To add a new image entry, just add

{ image: require('<<path_to_image>>') }

to an end of the array
*/

export const creatureImages = [
  { image: require('./assets/creatures/monster0.jpg') },
  { image: require('./assets/creatures/monster1.jpg') },
  { image: require('./assets/creatures/monster2.png') },
  { image: require('./assets/creatures/monster3.jpeg') },
  { image: require('./assets/creatures/monster4.jpg') },
]

// TODO: find race images for all races
export const raceImages = [
  // mage
  [
    { image: require('./assets/races/mage/mage0.png') },
    { image: require('./assets/races/mage/mage1.png') },
    { image: require('./assets/races/mage/mage2.jpg') },
  ],
  // hunter
  [
    { image: require('./assets/races/hunter/hunter0.jpg') },
    { image: require('./assets/races/hunter/hunter1.png') },
  ],
  // priest
  [
    { image: require('./assets/races/mage/mage0.png') },
    { image: require('./assets/races/mage/mage1.png') },
    { image: require('./assets/races/mage/mage2.jpg') },
  ],
  // dark magician
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
  // warrior
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
  // symbiont
  [{ image: require('./assets/races/other/morph.jpg') }],
  // unit without spells
  [{ image: require('./assets/races/other/morph.jpg') }],
]

export const addUnitImage = { image: require('./assets/add.png'), title: 'Nový' }
