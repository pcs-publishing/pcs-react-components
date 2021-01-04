import React, { useCallback } from 'react'
import {
  FilterDefinition,
  SingleFilterChangeHandler,
  InputType
} from '../../../definitions/filter'
import DateRange, { DateRangeOptions } from '../../Form/DateRange'


interface DateRangeFilterProps<T, U extends string = InputType> {
  value?: unknown
  filterDefinition: FilterDefinition<T, U>
  changeHandler: SingleFilterChangeHandler<T>
}



const DateRangeFilter = <T extends any, U extends string = InputType>(props: DateRangeFilterProps<T, U>) => {
  const { filterDefinition, changeHandler } = props

  const onChange = useCallback(() => {
    changeHandler(filterDefinition.name, props.value as DateRangeOptions)
  }, [filterDefinition, changeHandler])

  return <DateRange label={filterDefinition.label} value={props.value as DateRangeOptions} onChange={onChange} />
}

export default DateRangeFilter
