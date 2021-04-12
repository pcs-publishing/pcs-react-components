import React from 'react'
import { formatColumnValue } from './FormatColumnService'
import { ColumnDefinition } from '../definitions'

describe('FormatColumnService', () => {
  describe('formatColumnValue', () => {
    it('Should return the value straight from the record if there is no format function or type', () => {
      const record = {
        virus: 'COVID-19'
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'virus'
      }
      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toBe('COVID-19')
    })

    it('Should format a datelong type correctly', () => {
      const record = {
        outbreakDate: '20-Mar-2020'
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'outbreakDate',
        type: 'datelong'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toBe('Fri 20th Mar 2020')
    })

    it('Should format a date type correctly', () => {
      const record = {
        outbreakDate: '20-Mar-2020'
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'outbreakDate',
        type: 'date'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toBe('20/03/2020')
    })

    it('Should format a datetime type correctly', () => {
      const record = {
        outbreakDate: 'Fri Mar 20 2020 16:59:24'
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'outbreakDate',
        type: 'datetime'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toBe('20/03/2020 4:59pm')
    })

    it('Should return an empty string for a date column if there is no date value', () => {
      const record = {
        outbreakDate: null
      }

      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'outbreakDate',
        type: 'datetime'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toBe('')
    })

    it('Should handle a custom formatter function properly', () => {
      const record = {
        stopped: false
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'stopped',
        format: (val) => (!!val.stopped ? 'Stopped' : 'Live')
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toBe('Live')
    })

    it('Should allow for a React component to be returned from a format function', () => {
      const record = {
        stopped: true
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'stopped',
        format: (val) => (!!val ? <p>Stopped</p> : <h4>Live</h4>)
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toEqual(<p>Stopped</p>)
    })

    it('Should format show the firstname and surname of a user when the column type is "user"', () => {
      const record = {
        createdBy: {
          firstname: 'Chris',
          surname: 'Train'
        }
      }
      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'createdBy',
        title: 'Created By',
        type: 'user'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toEqual('Chris Train')
    })

    it('Should return an empty string when the column type is user but there is no data for that column', () => {
      const record = {
        user: undefined
      }

      const basicDefinition: ColumnDefinition<typeof record> = {
        // @ts-ignore // ignore the typescript error to run this safety net test
        key: 'createdBy',
        title: 'Created By',
        type: 'user'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toEqual('')
    })

    it('Should format a "named-record" type so that the name is displayed', () => {
      const record = {
        status: { name: 'Complete' }
      }

      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'status',
        type: 'named-record'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toEqual('Complete')
    })

    it('Should format a "named-record" type so empty string is displayed when no name found', () => {
      const record = {
        status: null
      }

      const basicDefinition: ColumnDefinition<typeof record> = {
        key: 'status',
        type: 'named-record'
      }

      const value = formatColumnValue(record, basicDefinition, 0)
      expect(value).toEqual('')
    })
  })
})
