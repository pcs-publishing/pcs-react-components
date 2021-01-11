import React, { useCallback } from 'react'
import {
  FilterDefinition,
  SingleFilterChangeHandler
} from '../../../definitions/filter'
import DateRange, { DateRangeOptions } from '../../Form/DateRange'


interface DateRangeFilterProps<T, U extends string> {
  value?: unknown
  filterDefinition: FilterDefinition<T, U>
  changeHandler: SingleFilterChangeHandler<T>
}



const DateRangeFilter = <T extends any, U extends string>(props: DateRangeFilterProps<T, U>) => {
  const { filterDefinition, changeHandler } = props

  const onChange = useCallback((value: DateRangeOptions | undefined) => {
    changeHandler(filterDefinition.name, value)
  }, [filterDefinition, changeHandler])

  return <DateRange label={filterDefinition.label} value={props.value as DateRangeOptions} onChange={onChange} />
}

export default DateRangeFilter
