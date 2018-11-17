import produce from 'immer'
import { setIn } from 'imuty'

const int = (strNum) => parseInt(strNum, 10)

export const updateValue = (path, data, type) => ({
  type: type || `Update state in [${path}]`,
  payload: data,
  reducer: (state) => setIn(state, path, data),
})

export const convertFormStringsToNumbers = () => ({
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
    })
  },
})
