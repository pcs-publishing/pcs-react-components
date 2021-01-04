import { ReactElement } from 'react'

export type InputType = 'textfield' | 'daterange' | 'format'

export interface FilterDefinition<Filter, FilterType extends string> {
  type: FilterType
  name: keyof Filter
  queryName?: string
  label?: string
  icon?: string
  mask?: string
  inputType?: string
  format?: (
    filterDefinition: FilterDefinition<Filter, FilterType>
  ) => JSX.Element
}

export interface FilterItemRecord {
  _id: string
  name: string
}

export type SingleFilterChangeHandler<Filter> = (
  name: keyof Filter,
  value: FilterValue
) => void

export type GetFilterComponentFn<T, U extends string> = (
  filterDefinition: FilterDefinition<T, U>,
  singleFilterChangeHandler: SingleFilterChangeHandler<T>,
  currentFilter: Partial<T>
) => ReactElement | null

export type FilterValue =
  | string
  | string[]
  | Date
  | DateRange
  | number
  | NumberRange
  | boolean
  | undefined

export interface DateRange {
  start: Date
  end: Date
}

export interface NumberRange {
  min?: number
  max?: number
}
