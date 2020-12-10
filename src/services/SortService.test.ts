import { sortData } from './SortService'
import { ColumnDefinition } from '../definitions'
import _ from 'lodash'

describe('SortService', () => {
  describe('sortData', () => {
    const itemA = {
      year: 2019,
      date: '15-May-2019',
      created: new Date(2019, 0, 4),
      person: {
        rank: 8
      }
    }
    const itemB = {
      year: 2021,
      date: '1-Apr-2021',
      created: new Date(2019, 0, 3),
      person: {
        rank: 5
      }
    }
    const itemC = {
      year: 2020,
      date: '20-Feb-2020',
      created: new Date(2020, 1, 12),
      person: {
        rank: 3
      }
    }

    const originalData = [itemA, itemB, itemC]

    const columnDefinitions: ColumnDefinition<typeof itemA>[] = [
      {
        key: 'year'
      },
      {
        key: 'date',
        type: 'date'
      },
      {
        key: 'created',
        type: 'datetime'
      },
      {
        key: 'person',
        beforeSort: (item) => {
          if (_.isObject(item.person) && item.person.hasOwnProperty('rank')) {
            return item.person.rank
          }
        }
      }
    ]

    it('Should return the original data if no sort column is passed in', () => {
      const result = sortData(originalData, '', columnDefinitions)
      expect(result).toBe(originalData)
    })

    it('Should return the original data if the passed column is not in the definition', () => {
      const result = sortData(originalData, 'seconds', columnDefinitions)
      expect(result).toBe(originalData)
    })

    it('Should sort by the passed column if it is in the definition', () => {
      const result = sortData(originalData, 'year', columnDefinitions)
      expect(result).toEqual([itemA, itemC, itemB])
    })

    it('Should sort by the column type if there is one', () => {
      const result = sortData(originalData, 'date', columnDefinitions)
      expect(result).toEqual([itemA, itemC, itemB])
    })

    it('Should sort by a date column when the values are already dates', () => {
      const result = sortData(originalData, 'created', columnDefinitions)
      expect(result).toEqual([itemB, itemA, itemC])
    })

    it('Should sort the values in descending order, when descending sort order is passed', () => {
      const result = sortData(
        originalData,
        'year',
        columnDefinitions,
        'descending'
      )
      expect(result).toEqual([itemB, itemC, itemA])
    })

    it('Should sort by the value returned by the column definitions beforeSort function if it has one', () => {
      const result = sortData(originalData, 'person', columnDefinitions)
      expect(result).toEqual([itemC, itemB, itemA])
    })
  })
})
