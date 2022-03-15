import { reactive } from '../index'

describe('reactive', () => {
  it('happy path', () => {
    const origin = { money: 100 }
    const bank = reactive(origin)
    expect(bank).not.toBe(origin)
    expect(bank.money).toBe(100)
  })
})
