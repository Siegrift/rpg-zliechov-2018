import produce from 'immer'
import { setIn } from 'imuty'

import { creatureSpells, fighterSpells } from './spells'
import { items } from './items'

const int = (strNum) => parseInt(strNum, 10)

export const updateValue = (path, data, type) => ({
  type: type || `Update state in [${path}]`,
  payload: data,
  reducer: (state) => setIn(state, path, data),
})

export const prepareStateForFight = () => ({
  type: 'Convert input (number) strings to integers',
  reducer: (immutableState) => {
    return produce(immutableState, (state) => {
      const { creatures, fighters } = state

      // convert creature strings
      for (let i = 0; i < creatures.length; i++) {
        creatures[i].power = int(creatures[i].power)
        creatures[i].agi = int(creatures[i].agi)
        creatures[i].int = int(creatures[i].int)
        for (let r = 0; r < creatures[i].rewardItems.length; r++) {
          creatures[i].rewardItems[r] = int(creatures[i].rewardItems[r])
        }
      }

      // convert fighters
      for (let i = 0; i < fighters.length; i++) {
        fighters[i].power = int(fighters[i].power)
        fighters[i].agi = int(fighters[i].agi)
        fighters[i].int = int(fighters[i].int)
        fighters[i].level = int(fighters[i].level)
      }

      // set mana pool for each hero
      for (const f of fighters) {
        f.manaPool = f.int
      }
    })
  },
})

export const buffCreature = () => ({
  type: 'Buff creature',
  reducer: (state) => {
    let newState = state
    const fn = (draft, spellIndex) => {
      creatureSpells[spellIndex].onInvoke(draft.fighters[0], draft.creatures[0], draft)
    }
    for (const spellIndex of state.creatures[0].spellIndexes) {
      newState = produce(newState, (draft) => fn(draft, spellIndex))
    }
    return newState
  },
})

export const computeCreatureStats = () => ({
  type: 'Compute creature base stats',
  reducer: (state) => {
    const creaturesPower = state.creatures.reduce((acc, f) => acc + f.power, 0)
    const creaturesAgi = state.creatures.reduce((acc, f) => acc + f.agi, 0)
    const creaturesInt = state.creatures.reduce((acc, f) => acc + f.int, 0)
    return { ...state, initialCreatureStats: [creaturesPower, creaturesAgi, creaturesInt] }
  },
})

export const applyPassives = () => ({
  type: 'Apply passives',
  reducer: (state) => {
    return produce(state, (draftState) => {
      state.fighters.forEach((f, i) => {
        // apply spell passives
        for (let i = 0; i < f.spellLevels.length; i++) {
          if (f.spellLevels[i] > 0 && fighterSpells[f.race][i].passive) {
            fighterSpells[f.race][i].onInvoke(draftState.fighters[i], null, draftState)
          }
        }

        // apply item passives
        for (let i = 0; i < f.itemLevels.length; i++) {
          if (items[f.itemIndexes[i]].passive) {
            items[f.itemIndexes[i]].onInvoke(draftState.fighters[i], null, draftState)
          }
        }
      })
    })
  },
})
