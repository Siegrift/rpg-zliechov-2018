import { cloneDeep } from 'lodash'

export const proxyTarget = (proxy) => {
  return cloneDeep(proxy)
}
