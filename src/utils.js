const proxyTarget = (proxy) => {
  const ans = {}
  Object.keys(proxy).forEach((key) => {
    ans[key] = proxy[key]
  })
  return ans
}
