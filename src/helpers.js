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
import { cloneDeep } from 'lodash'
import { creatureSpells, fighterSpells } from './spells'
import { items } from './items'
import { MAX_SPELL_LEVELS, RACES } from './constants'

export const proxyTarget = (proxy) => {
  return cloneDeep(proxy)
}

export const canUpgradeSpell = (freeAttr, spellIndex, spellLevel, level) => {
  if (spellIndex === 4 && level < 6) return false
  if (spellLevel === 1 && level < 3) return false
  if (spellLevel === 2 && level < 5) return false
  return freeAttr !== 0 && spellLevel !== MAX_SPELL_LEVELS[spellIndex]
}

export const setFightersChief = (fighters) => {
  let chief
  let maxLevel = -1
  for (let i = 0; i < fighters.length; i++) {
    fighters[i].isChief = false
    if (maxLevel < fighters[i].level) {
      maxLevel = fighters[i].level
      chief = fighters[i]
    }
  }
  chief.isChief = true
}

// Damage helpers
export const powerDmg = (creature, amount, state) => {
  if (creature.invisible) return
  if (creature.draciaKoza) {
    creature.power -= Math.min(Math.ceil(amount / 2), creature.power)
  } else {
    creature.power -= Math.min(amount, creature.power)
  }
}

export const agiDmg = (creature, amount, state) => {
  if (creature.invisible) return
  if (creature.draciaKoza) {
    creature.agi -= Math.min(Math.ceil(amount / 2), creature.agi)
  } else {
    creature.agi -= Math.min(amount, creature.agi)
  }
}

export const intDmg = (creature, amount, state) => {
  if (creature.invisible) return
  if (creature.draciaKoza) {
    creature.int -= Math.min(Math.ceil(amount / 2), creature.int)
  } else {
    creature.int -= Math.min(amount, creature.int)
  }
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
  // apply auras to yourself from items
  for (let i = 0; i < newFighter.itemIndexes.length; i++) {
    if (
      items[newFighter.itemIndexes[i]].isEnabled &&
      items[newFighter.itemIndexes[i]].isEnabled({ fighter: newFighter, state, index: i }) &&
      items[newFighter.itemIndexes[i]].applyAura
    ) {
      items[newFighter.itemIndexes[i]].applyAura({ fighter: newFighter, state, index: i })
    }
  }
  // add fighter to state
  state.fighters.push(newFighter)
  setFightersChief(state.fighters)
}

export const removeFighter = (removedFighter, state) => {
  // remove auras of this fighter from other fighters
  for (const fighter of state.fighters) {
    if (fighter.buffs[removedFighter.id] !== undefined) {
      for (const spellID of fighter.buffs[removedFighter.id]) {
        fighterSpells[removedFighter.race][spellID].detachAura(fighter, removedFighter, state)
      }
      delete fighter.buffs[removedFighter.id]
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
  setFightersChief(state.fighters)
}

// Attack helpers

export const dealCombatDamage = (fighter, monster, state) => {
  let attributes = {
    power: fighter.power + fighter.bonusPower,
    agi: fighter.agi + fighter.bonusAgi,
    int: fighter.int + fighter.bonusInt,
  }
  if (
    fighter.race === RACES.MAGE ||
    fighter.race === RACES.WARLOCK ||
    fighter.race === RACES.PRIEST
  ) {
    attributes.int *= 2
  } else if (fighter.race === RACES.WARRIOR) {
    attributes.power *= 2
  } else if (fighter.race === RACES.HUNTER || fighter.race === RACES.SYMBIONT) {
    attributes.agi *= 2
  }
  if (fighter.buffs.svatyCiel) {
    attributes.agi += fighter.buffs.svatyCiel * fighter.agi
  }
  for (const spell of fighterSpells[fighter.race]) {
    if (spell.isEnabled && spell.isEnabled({ fighter, state }) && spell.combatModifier) {
      attributes = spell.combatModifier(fighter, attributes, state)
    }
  }
  for (let i = 0; i < fighter.itemIndexes.length; i++) {
    if (
      items[fighter.itemIndexes[i]].isEnabled &&
      items[fighter.itemIndexes[i]].isEnabled({ fighter, state }) &&
      items[fighter.itemIndexes[i]].combatModifier
    ) {
      attributes = items[fighter.itemIndexes[i]].combatModifier(fighter, attributes, state)
    }
  }
  powerDmg(monster, Math.ceil(attributes.power), state)
  agiDmg(monster, Math.ceil(attributes.agi), state)
  intDmg(monster, Math.ceil(attributes.int), state)
  if (fighter.buffs.willDie) {
    removeFighter(fighter, state)
  }
}

export const formatItemTitle = (item, level) => {
  if (item.maxLevel) return `${item.title} (${level})`
  return item.title
}

export const formatSpellTitle = (spell, level, i) => {
  if (i === 0) return spell.title
  return `${spell.title} (${level})`
}
