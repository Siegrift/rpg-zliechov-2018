import { setIn } from 'imuty'

export const updateValue = (path, data, options) => ({
  type: (options && options.type) || `Update state in ${path}`,
  payload: data,
  undoable: options && options.undoable,
  reducer: (state) => setIn(state, path, data),
})
