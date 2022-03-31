export const extend = Object.assign

export const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

export const hasChange = (value, newValue) => {
  return !Object.is(value, newValue)
}
