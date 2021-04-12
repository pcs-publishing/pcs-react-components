import { ColumnDefinition, ColumnValueType } from '../definitions'
import _ from 'lodash'
import {
  isValidDate,
  getFormattedDateLong,
  getFormattedDateTime,
  getDayNameFromDate,
  getTimeFromDate,
  getFormattedDateShort
} from '../util/date'

export function formatColumnValue<T>(
  record: T,
  columnDefinition: ColumnDefinition<T>,
  index: number,
  isExport?: boolean
): any {
  const formatFn =
    isExport && columnDefinition.exportFormat
      ? columnDefinition.exportFormat
      : columnDefinition.format

  if (formatFn) {
    return formatFn(record, index)
  }

  return formatByType(
    record,
    columnDefinition.key as keyof T,
    columnDefinition.type
  )
}

export function formatColumnName<T>(
  columnDefinition: ColumnDefinition<T>
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
    case 'datelong':
      return getFormattedDateLongString(value)
    case 'date':
      return getFormattedDateShortString(value)
    case 'datetime':
      return getFormattedDateTimeString(value)
    case 'day':
      return getFormattedDayString(value)
    case 'time':
      return getFormattedTimeString(value)
    case 'user':
      return getFormattedUser(value)
    case 'named-record':
      return getFormattedNamedRecord(value)
    default:
      return value
  }
}

export function getFormattedDateLongString(date: unknown): string {
  return isValidDate(date) ? getFormattedDateLong(date) : ''
}

export function getFormattedDateShortString(date: unknown): string {
  return isValidDate(date) ? getFormattedDateShort(date) : ''
}

export function getFormattedDateTimeString(date: unknown): string {
  return isValidDate(date) ? getFormattedDateTime(date) : ''
}

export function getFormattedTimeString(date: unknown): string {
  return isValidDate(date) ? getTimeFromDate(date) : ''
}

export function getFormattedDayString(date: unknown): string {
  return isValidDate(date) ? getDayNameFromDate(date) : ''
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
