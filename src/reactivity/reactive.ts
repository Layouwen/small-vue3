import { mutableHandles, readonlyHandles, shallowReadonlyHandlers } from './baseHandles'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive__',
  IS_READONLY = '__v_isReadonly__',
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandles)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles)
}

export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

function createActiveObject(raw, baseHandles) {
  return new Proxy(raw, baseHandles)
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}
