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
})
