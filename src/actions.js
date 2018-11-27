import produce from 'immer'
import { pick } from 'lodash'
import { setIn } from 'imuty'

import getInitialState from './store/initialState'
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
        if (creatures[i].rewardItems) {
          for (let r = 0; r < creatures[i].rewardItems.length; r++) {
            creatures[i].rewardItems[r] = int(creatures[i].rewardItems[r])
          }
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

      // determine the figthters chief
      let chief
      let maxLevel = -1
      for (let i = 0; i < fighters.length; i++) {
        if (maxLevel < fighters[i].level) {
          maxLevel = fighters[i].level
          chief = fighters[i]
        }
      }
      chief.isChief = true
    })
  },
})

export const buffCreature = () => ({
  type: 'Buff creature',
  reducer: (state) => {
    let newState = state
    const fn = (draft, spellIndex) => {
      creatureSpells[spellIndex].onInvoke({
        fighter: draft.fighters[0],
        creature: draft.creatures[0],
        state: draft,
        index: spellIndex,
      })
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
            fighterSpells[f.race][i].onInvoke({
              fighter: draftState.fighters[i],
              state: draftState,
              index: i,
            })
          }
        }

        // apply item passives
        for (let i = 0; i < f.itemLevels.length; i++) {
          if (items[f.itemIndexes[i]].passive) {
            items[f.itemIndexes[i]].onInvoke({
              fighter: draftState.fighters[i],
              state: draftState,
              index: i,
            })
          }
        }
      })
    })
  },
})

export const giveUpFight = () => ({
  type: 'Give up fight',
  reducer: (state) => {
    return produce(state, (draft) => {
      const chief = draft.fighters.find((f) => f.isChief)
      const creatures = draft.creatures
      const initialState = getInitialState()
      const keys = Object.keys(initialState)
      const draftKeys = Object.keys(draft)

      for (const key of draftKeys) {
        if (keys.includes(key)) draft[key] = initialState[key]
        else delete draft[key]
      }

      creatures.push({
        ...pick(chief, 'power', 'agi', 'int'),
        name: 'Kostlivec',
        imageIndex: 5,
        spellIndexes: [],
      })
      draft.creatures = creatures
      draft.page = 'dungeon'
    })
  },
})
