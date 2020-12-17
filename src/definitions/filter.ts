import { ReactElement } from 'react'

export type InputType =
  | 'textfield'
  | 'daterange'

export interface FilterDefinition<Filter, ExtendedInputType extends InputType> {
  type: ExtendedInputType
  name: keyof Filter
  queryName?: string
  label?: string
  icon?: string
  mask?: string
}

export interface FilterItemRecord {
  _id: string
  name: string
}

export type SingleFilterChangeHandler<Filter> = (
  name: keyof Filter,
  value: FilterValue
) => void

export type GetFilterComponentFn<T, U extends InputType> = (filterDefinition: FilterDefinition<T, U>, singleFilterChangeHandler: SingleFilterChangeHandler<T>, currentFilter: Partial<T>) => ReactElement

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
