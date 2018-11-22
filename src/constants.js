export const CARD_IMAGE_SIZE = 500
export const SPELL_ANIMATION_SIZE = 350
export const ANIMATION_TIME = 0.5
export const MAX_SPELL_LEVELS = [3, 3, 3, 1]

export const CHOOSE = {
  OTHER_UNIT: 1,
  UNIT: 2,
  ATTRIBUTE: 3,
  HERO: 4,
  OTHER_HERO: 5,
  SUMMON: 6,
  OTHER_SUMMON: 7,
}

// TODO: getEntities implementation, and also in ImageDialog and AttributeDialog
// (index of selected item no longer enough)
export const CHOOSE_LOGIC = {
  [CHOOSE.OTHER_UNIT]: {
    getEntities: (images) =>
      images.map((im, i) => ({ ...im, isEnabled: i === 0 ? () => false : im.isEnabled })),
  },
  [CHOOSE.UNIT]: {
    getEntities: (images) =>
      images.map((im, i) => ({ ...im, isEnabled: i === 0 ? () => false : im.isEnabled })),
  },
  [CHOOSE.HERO]: {
    getEntities: (images) =>
      images.map((im, i) => ({ ...im, isEnabled: i === 0 ? () => false : im.isEnabled })),
  },
  [CHOOSE.OTHER_HERO]: {
    getEntities: (images) =>
      images.map((im, i) => ({ ...im, isEnabled: i === 0 ? () => false : im.isEnabled })),
  },
  [CHOOSE.SUMMON]: {
    getEntities: (images) =>
      images.map((im, i) => ({ ...im, isEnabled: i === 0 ? () => false : im.isEnabled })),
  },
  [CHOOSE.OTHER_SUMMON]: {
    getEntities: (images) =>
      images.map((im, i) => ({ ...im, isEnabled: i === 0 ? () => false : im.isEnabled })),
  },
}

export const RACES = {
  MAGE: 0,
  HUNTER: 1,
  PRIEST: 2,
  WARLOCK: 3,
  WARRIOR: 4,
  // race 5 is both unit and hero
  SYMBIONT: 5,
  // other races are just summons of the races above
  MORPH: 6,
}

export const LAST_HERO_INDEX = RACES.SYMBIONT
export const FIRST_SUMMON_INDEX = RACES.SYMBIONT