import { MAX_SPELL_LEVELS } from './constants'

export const canUpgradeSpell = (freeAttr, spellIndex, spellLevel, level) => {
  return freeAttr !== 0 && spellLevel !== MAX_SPELL_LEVELS[spellIndex]
}
