import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, ReactiveFlags, readonly } from './reactive'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    const res = Reflect.get(target, key)

    // 如果是浅层，只返回值，不做响应式处理
    if (shallow) {
      return res
    }

    // 如果是 object 继续处理为响应式
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}

export const mutableHandles = {
  get,
  set,
}

export const readonlyHandles = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`Set ${key} properties in readonly is not allow`, target)
    return true
  },
}

export const shallowReadonlyHandlers = extend({}, readonlyHandles, {
  get: shallowReadonlyGet,
})
