import { readonly } from '../reactive'

describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
  })
  it('warn then call set', () => {
    console.warn = jest.fn()
    const info = readonly({ name: 'avan' })
    info.name = 'layouwen'
    expect(console.warn).toHaveBeenCalled()
  })
})
