import { getFirstErrorMessage, hasErrors } from '../../src/domain/formErrors'

describe(getFirstErrorMessage, () => {
  describe('when given an array with multiple elements', () => {
    it('returns the first element', () => {
      expect(getFirstErrorMessage(['one', 'two'])).toEqual('one')
    })
  })

  describe('when given an empty array', () => {
    it('returns undefined', () => {
      expect(getFirstErrorMessage([])).toBeUndefined()
    })
  })
})

describe(hasErrors, () => {
  describe('when given an array with multiple elements', () => {
    it('returns true', () => {
      expect(hasErrors(['one', 'two'])).toEqual(true)
    })
  })

  describe('when given an empty array', () => {
    it('returns undefined', () => {
      expect(hasErrors([])).toEqual(false)
    })
  })
})
