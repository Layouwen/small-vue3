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

  test('nested reactive', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
