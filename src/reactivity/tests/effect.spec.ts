import { effect, reactive, stop } from '../index'

describe('effect', () => {
  it('happy path', () => {
    const bank = reactive({
      money: 100,
    })

    let myMoney
    effect(() => {
      myMoney = bank.money * 2
    })
    expect(myMoney).toBe(200)
    bank.money = 50
    expect(myMoney).toBe(100)
  })

  it('should return runner when calling effect', () => {
    let age = 10
    const runner = effect(() => {
      age++
      return 'Avan'
    })
    expect(age).toBe(11)
    const res = runner()
    expect(age).toBe(12)
    expect(res).toBe('Avan')
  })

  it('scheduler', () => {
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    )
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })

  it('stop', () => {
    let dummy
    const obj = reactive({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.prop = 3
    obj.prop++
    expect(dummy).toBe(2)
    runner()
    expect(dummy).toBe(4)
  })

  it('onStop', () => {
    const obj = reactive({
      foo: 1,
    })
    const onStop = jest.fn()
    let dummy
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { onStop }
    )
    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
