import { ReactElement } from 'react'

export type DisplayNotificationOptions =
  | 'success'
  | 'error'
  | 'warning'
  | 'message'

export type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type ColumnValueType =
  | 'date'
  | 'datetime'
  | 'user'
  | 'named-record'
  | 'boolean'
  | 'time'
  | 'day'

export type SortDirection = 'ascending' | 'descending' | undefined

export interface Sort {
  column: string
  direction: SortDirection
}

export interface ColumnDefinition<T> {
  key: keyof T | string
  type?: ColumnValueType // gives a default beforeSort and format value
  title?: string
  export?: boolean
  sortable?: boolean
  beforeSort?: (record: T) => string | number | Date | undefined | boolean // format before sort
  format?: (record: T, index: number) => string | ReactElement // format before display
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  padding?: number
  center?: boolean
  exportFormat?: (
    record: T,
    index: number
  ) => string | number | Date | boolean | undefined
}

export interface PageInfo {
  page: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

export type SelectionMode = 'single' | 'multi'

// https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
export type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
  }[keyof Base]
>

export interface ProcessingState {
  running: boolean
  error?: string
  totalSteps?: number
  currentStep?: number
}

export interface FileRecord {
  url: string
  name: string
  mimeType: string
  textContent?: string
}
