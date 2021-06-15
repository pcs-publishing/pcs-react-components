import React, { useCallback } from 'react'
import {
  FilterDefinition,
  SingleFilterChangeHandler
} from '../../../definitions/filter'
import SingleDatePicker from '../../Form/SingleDatePicker'


interface DateFilterProps<T, U extends string> {
  value?: unknown
  filterDefinition: FilterDefinition<T, U>
  changeHandler: SingleFilterChangeHandler<T>
}

const DateRangeFilter = <T extends any, U extends string>(props: DateFilterProps<T, U>) => {
  const { filterDefinition, changeHandler } = props

  const onChange = useCallback((value: Date) => {
    changeHandler(filterDefinition.name, value)
  }, [filterDefinition, changeHandler])

  return <SingleDatePicker label={filterDefinition.label} date={props.value as Date} onChange={onChange} />
}

export default DateRangeFilter
