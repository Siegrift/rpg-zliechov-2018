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
import { creatureSpells, fighterSpells } from './spells'

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

// Crate fighters helpers

export const addFighter = (state, newFighter) => {
	// apply auras from others to new fighter
	for (const fighter of state.fighters) {
		for (const spell of fighterSpells[fighter.race]) {
			if (spell.passive && spell.isEnabled && spell.isEnabled({fighter}) && spell.doesApply && spell.DoesApply(newFighter, fighter, state)) {
				spell.applyAura(newFighter, fighter, state)
			}
		}
	}
	// apply auras from monsters to new fighter
	for (const monster of state.creatures) {
		for (let i = 0; i < monster.spellIndexes.length; i++) {
			if (monster.spellIndexes[i] && creatureSpells[i].doesApply && creatureSpells[i].doesApply(newFighter, monster, state)) {
				creatureSpells[i].applyAura(newFighter, monster, state)
			}
		}
	}
	// apply auras from new fighter to others
	for (const spell of fighterSpells[newFighter.race]) {
		for (const fighter of state.fighters) {
			if (spell.passive && spell.isEnabled && spell.isEnabled({newFighter}) && spell.doesApply && spell.DoesApply(fighter, newFighter, state)) {
				spell.applyAura(fighter, newFighter, state)
			}
		}
	}
	// apply auras from new fighter to monsters
	for (const spell of fighterSpells[newFighter.race]) {
		for (const monster of state.creatures) {
			if (spell.passive && spell.isEnabled && spell.isEnabled({newFighter}) && spell.doesApply && spell.DoesApply(monster, newFighter, state)) {
				spell.applyAura(monster, newFighter, state)
			}
		}
	}
}