import { isValid, format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { formatDropdownOptions } from './format'

type DateValue = Date | string | number

export function isValidDate(date: unknown): date is DateValue {
  if (!date) return false
  return isValid(new Date(date as DateValue))
}

export function getFormattedDateShort(date: DateValue): string {
  return formatDate(date, 'P')
}

export function getFormattedDateLong(date: DateValue): string {
  return formatDate(date, 'eee do MMM yyyy')
}

export function getFormattedDateTime(date: DateValue): string {
  return formatDate(date, 'P h:mma').toLowerCase()
}

export function formatDate(date: DateValue, formatTemplate: string): string {
  return format(new Date(date), formatTemplate, {
    locale: enGB
  })
}

type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export function getDaysOfWeek(): { name: DayOfWeek }[] {
  return [
    {
      name: 'Monday'
    },
    {
      name: 'Tuesday'
    },
    {
      name: 'Wednesday'
    },
    {
      name: 'Thursday'
    },
    {
      name: 'Friday'
    },
    {
      name: 'Saturday'
    },
    {
      name: 'Sunday'
    }
  ]
}

export function getDaysOfWeekFormattedOptions(): {
  key: DayOfWeek
  text: DayOfWeek
  value: DayOfWeek
}[] {
  return formatDropdownOptions(getDaysOfWeek(), 'name', 'name')
}
