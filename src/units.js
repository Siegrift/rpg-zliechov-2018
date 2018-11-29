/*
To add a new image entry, just add

{ image: require('<<path_to_image>>') }

to an end of the array
*/

export const creatureImages = [
  { image: require('./assets/creatures/assassin.jpeg') },
  { image: require('./assets/creatures/assassin2.jpeg') },
  { image: require('./assets/creatures/assassin3.jpg') },
  { image: require('./assets/creatures/assassins.jpeg') },
  { image: require('./assets/creatures/ball.jpg') },
  { image: require('./assets/creatures/centaur.jpg') },
  { image: require('./assets/creatures/centaur2.jpg') },
  { image: require('./assets/creatures/cloud.jpg') },
  { image: require('./assets/creatures/demon.jpg') },
  { image: require('./assets/creatures/demon3.jpeg') },
  { image: require('./assets/creatures/demon4.jpg') },
  { image: require('./assets/creatures/demon5.jpg') },
  { image: require('./assets/creatures/dragon.jpeg') },
  { image: require('./assets/creatures/dragon2.jpeg') },
  { image: require('./assets/creatures/dragon3.jpeg') },
  { image: require('./assets/creatures/drak.jpg') },
  { image: require('./assets/creatures/dwarf.jpg') },
  { image: require('./assets/creatures/eye.jpg') },
  { image: require('./assets/creatures/giant.jpg') },
  { image: require('./assets/creatures/golem.jpg') },
  { image: require('./assets/creatures/hydra.jpg') },
  { image: require('./assets/creatures/invoker.jpg') },
  { image: require('./assets/creatures/jar_jar.jpg') },
  { image: require('./assets/creatures/king.jpeg') },
  { image: require('./assets/creatures/king_frozen.jpg') },
  { image: require('./assets/creatures/mag.jpg') },
  { image: require('./assets/creatures/mag2.jpg') },
  { image: require('./assets/creatures/mage.jpeg') },
  { image: require('./assets/creatures/necrophos.jpeg') },
  { image: require('./assets/creatures/neviem.jpg') },
  { image: require('./assets/creatures/ogre.jpeg') },
  { image: require('./assets/creatures/pheonix.jpeg') },
  { image: require('./assets/creatures/pudge.jpeg') },
  { image: require('./assets/creatures/reptiel.jpeg') },
  { image: require('./assets/creatures/robot.jpg') },
  { image: require('./assets/creatures/shade.jpg') },
  { image: require('./assets/creatures/siren.jpeg') },
  { image: require('./assets/creatures/skeleton.jpg') },
  { image: require('./assets/creatures/skeleton2.jpeg') },
  { image: require('./assets/creatures/skeleton_archer.jpeg') },
  { image: require('./assets/creatures/snake.jpg') },
  { image: require('./assets/creatures/spectre.jpeg') },
  { image: require('./assets/creatures/spider.jpg') },
  { image: require('./assets/creatures/spider2.jpeg') },
  { image: require('./assets/creatures/summoner.jpg') },
  { image: require('./assets/creatures/undying.jpeg') },
  { image: require('./assets/creatures/undying2.jpg') },
  { image: require('./assets/creatures/unicorn.jpg') },
  { image: require('./assets/creatures/walker.jpeg') },
  { image: require('./assets/creatures/walker.jpg') },
  { image: require('./assets/creatures/walker3.jpg') },
  { image: require('./assets/creatures/walker4.png') },
  { image: require('./assets/creatures/warrior.jpg') },
  { image: require('./assets/creatures/warrior2.jpg') },
  { image: require('./assets/creatures/warrior3.jpg') },
  { image: require('./assets/creatures/warrior_frozen.jpg') },
  { image: require('./assets/creatures/witch.jpg') },
  { image: require('./assets/creatures/wolfs.jpg') },
  { image: require('./assets/creatures/worm.jpeg') },
  { image: require('./assets/creatures/worm2.jpg') },
  { image: require('./assets/creatures/wraith.jpg') },
  { image: require('./assets/creatures/yoda.jpeg') },
]

// TODO: find race images for all races
export const raceImages = [
  // mage
  [
    { image: require('./assets/races/mage/mage.jpg') },
    { image: require('./assets/races/mage/mage1.jpg') },
    { image: require('./assets/races/mage/mage2.jpg') },
    { image: require('./assets/races/mage/mage3.jpg') },
    { image: require('./assets/races/mage/mage4.jpg') },
  ],
  // hunter
  [
    { image: require('./assets/races/hunter/hunter0.jpg') },
    { image: require('./assets/races/hunter/hunter1.png') },
  ],
  // priest
  [
    { image: require('./assets/races/mage/mage.jpg') },
    { image: require('./assets/races/mage/mage1.jpg') },
    { image: require('./assets/races/mage/mage2.jpg') },
  ],
  // dark magician
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
  // warrior
  [{ image: require('./assets/races/hunter/hunter0.jpg') }],
  // symbiont
  [{ image: require('./assets/races/other/morph.jpg') }],
  // unit without spells
  [
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
    { image: require('./assets/races/other/morph.jpg') },
  ],
  // archimond
  [{ image: require('./assets/races/archimond/archimond.jpg') }],
  // hunter's pet
  { image: require('./assets/races/other/morph.jpg') },
  // guardian angel
  [{ image: require('./assets/races/guardian_angel/anjel.jpg') }],
]

export const addUnitImage = { image: require('./assets/add.png'), title: 'Nový' }
