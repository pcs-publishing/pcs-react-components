import { ColumnDefinition, ColumnValueType } from '../definitions'
import _ from 'lodash'
import {
  isValidDate,
  getFormattedDateLong,
  getFormattedDateTime
} from '../util/date'

export function formatColumnValue<T, U>(
  record: T,
  columnDefinition: ColumnDefinition<T, U>,
  index: number
): any {
  if (columnDefinition.format) {
    return columnDefinition.format(record, index)
  }

  return formatByType(
    record,
    columnDefinition.key as keyof T,
    columnDefinition.type
  )
}

export function formatColumnName<T, U>(
  columnDefinition: ColumnDefinition<T, U>
): string {
  return columnDefinition.title ?? _.capitalize(columnDefinition.key as string)
}

function formatByType<T>(
  record: T,
  key: keyof T,
  type: ColumnValueType | undefined
): unknown {
  const value = record[key]
  switch (type) {
    case 'date':
      return getFormattedDateString(value)
    case 'datetime':
      return getFormattedDateTimeString(value)
    case 'user':
      return getFormattedUser(value)
    case 'named-record':
      return getFormattedNamedRecord(value)
    default:
      return value
  }
}

export function getFormattedDateString(date: unknown): string {
  return isValidDate(date) ? getFormattedDateLong(date) : ''
}

export function getFormattedDateTimeString(date: unknown): string {
  return isValidDate(date) ? getFormattedDateTime(date) : ''
}

function getFormattedUser(value: unknown): string {
  if (
    !_.isObject(value) ||
    !value.hasOwnProperty('firstname') ||
    !value.hasOwnProperty('surname')
  ) {
    return ''
  }

  const user = value as { firstname: unknown; surname: unknown }

  const getValue = (val: unknown): string => (_.isString(val) ? val : '')

  return _.trim(`${getValue(user.firstname)} ${getValue(user.surname)}`)
}

export function getFormattedNamedRecord(value: unknown): string {
  if (!_.isObject(value) || !value.hasOwnProperty('name')) {
    return ''
  }

  const record = value as { name: string }
  return _.isString(record.name) ? record.name : ''
}
