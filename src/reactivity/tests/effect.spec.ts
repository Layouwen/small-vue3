import { effect, reactive } from '../index'

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
})
