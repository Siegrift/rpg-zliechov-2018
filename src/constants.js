export const CARD_IMAGE_SIZE = 500
export const SPELL_ANIMATION_SIZE = 350
export const ANIMATION_TIME = 0.5
export const MAX_SPELL_LEVELS = [3, 3, 3, 1]

export const ATTRIBUTES = {
  POWER: 0,
  AGILITY: 1,
  INTELLIGENCE: 2,
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
  UNIT_WITHOUT_SPELLS: 6,
  ARCHIMOND: 7,
  HUNTERS_PET: 8,
}

export const SUMMONS = {
  ZOMBIE: 0,
  DEMON: 1,
  ARCHIMOND: 0,
  DIREWOLF: 0
}

export const LAST_HERO_INDEX = RACES.SYMBIONT
export const FIRST_SUMMON_INDEX = RACES.SYMBIONT

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
// getEntities = (imageData, selectedIndex, selectedEntity)
export const CHOOSE_LOGIC = {
  [CHOOSE.OTHER_UNIT]: {
    getEntities: (imageData, selectedIndex) =>
      imageData.map((data, i) => ({
        ...data,
        isEnabled: i === selectedIndex ? () => false : data.isEnabled,
      })),
  },
  [CHOOSE.UNIT]: {
    getEntities: (imageData) => imageData,
  },
  [CHOOSE.HERO]: {
    getEntities: (imageData) =>
      imageData.map((data, i) => ({
        ...data,
        isEnabled: i > LAST_HERO_INDEX ? () => false : data.isEnabled,
      })),
  },
  [CHOOSE.OTHER_HERO]: {
    getEntities: (imageData, selectedIndex) =>
      imageData.map((data, i) => ({
        ...data,
        isEnabled: i === selectedIndex || i > LAST_HERO_INDEX ? () => false : data.isEnabled,
      })),
  },
  [CHOOSE.SUMMON]: {
    getEntities: (imageData) =>
      imageData.map((data, i) => ({
        ...data,
        isEnabled: i < FIRST_SUMMON_INDEX ? () => false : data.isEnabled,
      })),
  },
  [CHOOSE.OTHER_SUMMON]: {
    getEntities: (imageData, selectedIndex) =>
      imageData.map((data, i) => ({
        ...data,
        isEnabled: i === selectedIndex || i < FIRST_SUMMON_INDEX ? () => false : data.isEnabled,
      })),
  },
}
