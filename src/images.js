export const creatureImages = [
  { image: require('./assets/creatures/monster0.jpg'), title: 'Príšera A' },
  { image: require('./assets/creatures/monster1.jpg'), title: 'Príšera B' },
  { image: require('./assets/creatures/monster2.png'), title: 'Príšera C' },
  { image: require('./assets/creatures/monster3.jpeg'), title: 'Príšera D' },
]

// all races have fixed spells (look in initialState.js for index<--->race mapping)
export const raceImages = [
  // TODO: find race images for all races
  [
    { image: require('./assets/races/mage/mage0.png'), title: 'Mág A' },
    { image: require('./assets/races/mage/mage1.png'), title: 'Mág B' },
    { image: require('./assets/races/mage/mage2.jpg'), title: 'Mág C' },
  ],
  [
    { image: require('./assets/races/hunter/hunter0.jpg'), title: 'Lovec A' },
    { image: require('./assets/races/hunter/hunter1.png'), title: 'Lovec B' },
  ],
  [{ image: require('./assets/races/hunter/hunter0.jpg'), title: 'Kňaz' }],
  [{ image: require('./assets/races/hunter/hunter0.jpg'), title: 'Černokňažník' }],
  [{ image: require('./assets/races/hunter/hunter0.jpg'), title: 'Bojovník' }],
]

export const itemImages = [
  { image: require('./assets/items/agh.jpg'), title: 'Aghanim' },
  { image: require('./assets/items/dagon.jpg'), title: 'Dagon' },
  { image: require('./assets/items/manta.png'), title: 'Manta' },
]

// all races have fixed spells (look in initialState.js for index<--->race mapping)
export const spellImages = [
  // TODO: find spell icons for all races
  [
    { image: require('./assets/spells/quas.png'), title: 'Quas' },
    { image: require('./assets/spells/wex.png'), title: 'Wex' },
    { image: require('./assets/spells/exort.png'), title: 'Exort' },
    { image: require('./assets/spells/invoke.jpg'), title: 'Invoke' },
  ],
  [
    { image: require('./assets/spells/wex.png'), title: 'Wex' },
    { image: require('./assets/spells/wex.png'), title: 'Wex' },
    { image: require('./assets/spells/wex.png'), title: 'Wex' },
    { image: require('./assets/spells/wex.png'), title: 'Wex' },
  ],
  [
    { image: require('./assets/spells/quas.png'), title: 'Quas' },
    { image: require('./assets/spells/quas.png'), title: 'Quas' },
    { image: require('./assets/spells/quas.png'), title: 'Quas' },
    { image: require('./assets/spells/quas.png'), title: 'Quas' },
  ],
  [
    { image: require('./assets/spells/exort.png'), title: 'Exort' },
    { image: require('./assets/spells/exort.png'), title: 'Exort' },
    { image: require('./assets/spells/exort.png'), title: 'Exort' },
    { image: require('./assets/spells/exort.png'), title: 'Exort' },
  ],
  [
    { image: require('./assets/spells/invoke.jpg'), title: 'Invoke' },
    { image: require('./assets/spells/invoke.jpg'), title: 'Invoke' },
    { image: require('./assets/spells/invoke.jpg'), title: 'Invoke' },
    { image: require('./assets/spells/invoke.jpg'), title: 'Invoke' },
  ],
]

export const creatureSpells = [
  { image: require('./assets/creatureSpells/fireSword.png'), title: 'Fire strike' },
  { image: require('./assets/creatureSpells/hidan.png'), title: 'Hidan' },
  { image: require('./assets/creatureSpells/sacrifice.jpg'), title: 'Sacrifice' },
]

export const addEntityImage = { image: require('./assets/add.png'), title: 'Nový' }
