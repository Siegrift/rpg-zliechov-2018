/*
By convention, the function receives three params
1) creature to deal damage to
2) dmg to be dealt
3) whole state
*/

/*
WHAT TO HANDLE:
- creature cannot go bellow 0
*/


// Damage helpers
export const powerDmg = (creature, amount, state) => {
  creature.power -= amount
  console.log(`Power${amount}`)
}

export const agiDmg = (creature, amount, state) => {
  creature.agi -= amount
  console.log(`Agi${amount}`)
}

export const intDmg = (creature, amount, state) => {
  creature.int -= amount
  console.log(`Int${amount}`)
}


// Enabler helpers

export const levelAndManaCostEnabled = (fighter, spellID, manaCost) => {
	if (
    fighter.spellLevels[spellID] === 0 ||
    fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
  ) {
    return false
  }
  return true
}


// Auras helpers
export const applyAuras = ({state, applier}) => {
}