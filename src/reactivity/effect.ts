import { extend } from './../shared/index'

let activeEffect
let shouldTrack

class ReactiveEffect {
  private _fn: any
  deps = []
  active = true
  onStop?: () => void
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  run() {
    // 如果没有激活，直接执行 runner 则执行一次
    if (!this.active) {
      return this._fn()
    }

    activeEffect = this

    // 每次只执行一次，然后取消跟踪状态
    shouldTrack = true
    const result = this._fn()
    shouldTrack = false
    return result
  }
  stop() {
    if (this.active) {
      cleanupEffect(this)
      // 设置了 onStep 回调，则执行
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()
  extend(_effect, options)
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

const targetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  // 如果 deps 存在了就不需要继续收集
  if (deps.has(activeEffect)) return
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

/**
 * 当前是否在跟踪
 */
function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  for (const effect of deps) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function stop(runner) {
  runner.effect.stop()
}
