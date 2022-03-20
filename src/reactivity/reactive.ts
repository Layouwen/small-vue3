import { mutableHandles, readonlyHandles } from './baseHandles'

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles)
}

function createActiveObject(raw, baseHandles) {
  return new Proxy(raw, baseHandles)
}
