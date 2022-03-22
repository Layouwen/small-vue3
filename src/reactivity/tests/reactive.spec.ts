import { isReactive, reactive } from '../index'

describe('reactive', () => {
  it('happy path', () => {
    const origin = { money: 100 }
    const bank = reactive(origin)
    expect(bank).not.toBe(origin)
    expect(bank.money).toBe(100)
    expect(isReactive(bank)).toBe(true)
    expect(isReactive(origin)).toBe(false)
  })
})
