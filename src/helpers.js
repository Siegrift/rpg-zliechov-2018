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
import { items } from './items'

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

export const addFighter = (newFighter, state) => {
  // apply auras from others to new fighter
  for (const fighter of state.fighters) {
    for (const spell of fighterSpells[fighter.race]) {
      if (
        spell.passive &&
        spell.isEnabled &&
        spell.isEnabled({ fighter }) &&
        spell.doesApply &&
        spell.doesApply(newFighter, fighter, state)
      ) {
        spell.applyAura(newFighter, fighter, state)
      }
    }
  }
  // apply auras from monsters to new fighter
  for (const monster of state.creatures) {
    for (let i = 0; i < monster.spellIndexes.length; i++) {
      if (
        monster.spellIndexes[i] &&
        creatureSpells[i].doesApply &&
        creatureSpells[i].doesApply(newFighter, monster, state)
      ) {
        creatureSpells[i].applyAura(newFighter, monster, state)
      }
    }
  }
  // apply auras from new fighter to others
  for (const spell of fighterSpells[newFighter.race]) {
    for (const fighter of state.fighters) {
      if (
        spell.passive &&
        spell.isEnabled &&
        spell.isEnabled({ fighter: newFighter }) &&
        spell.doesApply &&
        spell.doesApply(fighter, newFighter, state)
      ) {
        spell.applyAura(fighter, newFighter, state)
      }
    }
  }
  // apply auras from new fighter to monsters
  for (const spell of fighterSpells[newFighter.race]) {
    for (const monster of state.creatures) {
      if (
        spell.passive &&
        spell.isEnabled &&
        spell.isEnabled({ fighter: newFighter }) &&
        spell.doesApply &&
        spell.doesApply(monster, newFighter, state)
      ) {
        spell.applyAura(monster, newFighter, state)
      }
    }
  }
  // TODO: apply auras to yourself from items
  // add fighter to state
  state.fighters.push(newFighter)
}

export const removeFighter = (removedFighter, state) => {
  // remove auras of this fighter from other fighters
  for (const fighter of state.fighters) {
    if (fighter.buffs[removedFighter.id] !== undefined) {
      for (const spellID of fighter.buffs[removedFighter.id]) {
        fighterSpells[removedFighter.race][spellID].detachAura(fighter, removedFighter, state)
      }
      // TODO: toto sa da urcite lepsie odtial odstranit
      fighter.buffs[removedFighter.id] = []
    }
  }
  // remove auras of this fighter from monsters
  for (const monster of state.creatures) {
    if (monster.buffs[removedFighter.id] !== undefined) {
      for (const spellID of monster.buffs[removedFighter.id]) {
        fighterSpells[removedFighter.race][spellID].detachAura(monster, removedFighter, state)
      }
    }
  }
  // remove fighter
  state.fighters.splice(state.fighters.indexOf(removedFighter), 1)
}

// Attack helpers

export const dealCombatDamage = (fighter, monster, state) => {
  let attributes = {
    power: fighter.power + fighter.bonusPower,
    agi: fighter.agi + fighter.bonusAgi,
    int: fighter.int + fighter.bonusInt,
  }
  for (const spell of fighterSpells[fighter.race]) {
    if (spell.combatModifier) {
      attributes = spell.combatModifier(fighter, attributes)
    }
  }
  for (let i = 0; i < fighter.itemIndexes; i++) {
    if (items[fighter.itemIndexes[i]].combatModifier) {
      attributes = items[fighter.itemIndexes[i]].combatModifier(fighter, attributes)
    }
  }
  powerDmg(monster, attributes.power, state)
  agiDmg(monster, attributes.agi, state)
  intDmg(monster, attributes.int, state)
}