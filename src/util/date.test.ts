import { isValidDate, getDayNameFromDate, getTimeFromDate } from './date'

describe('Date Utils', () => {
  describe('isValidDate', () => {
    it('Should return true when passed a valid date', () => {
      const result = isValidDate(new Date(2020, 11, 25))
      expect(result).toBe(true)
    })

    it('Should return true if the value is a number that can represent a date', () => {
      const result = isValidDate(1608123561229)
      expect(result).toBe(true)
    })

    it('Should return true if a date that can be converted to a date object', () => {
      const result = isValidDate('2020-12-16T13:00:34.645Z')
      expect(result).toBe(true)
    })

    it('Should return false if the passed value is text that is not representative of a date', () => {
      const result = isValidDate('I am not a date')
      expect(result).toBe(false)
    })

    it('Should return false when given a number that is outside of the range of valid dates', () => {
      const result = isValidDate(-39423482093842094394)
      expect(result).toBe(false)
    })

    it('Should return false when passed an invalid date object', () => {
      const result = isValidDate(new Date(2020, 34920342))
      expect(result).toBe(false)
    })

    it('Should return false when passed an array', () => {
      const result = isValidDate([])
      expect(result).toBe(false)
    })

    it('Should return false when passed a non-date object', () => {
      const result = isValidDate({ start: new Date() })
      expect(result).toBe(false)
    })
  })

  describe('getFormattedDateShort', () => {
    it('Should return Monday if the passed in date is on a Monday ', () => {
      const result = getDayNameFromDate(new Date('2021-01-25'))
      expect(result).toBe('Monday')
    })
  })
})
