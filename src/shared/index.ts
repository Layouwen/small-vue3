export const extend = Object.assign

export const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

export const hasChange = (value, newVaule) => {
  return !Object.is(value, newVaule)
}
