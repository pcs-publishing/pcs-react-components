import React, { useCallback, useState } from 'react'
import { Form, InputOnChangeData } from 'semantic-ui-react'
import { capitalize } from 'lodash'

import {
  SingleFilterChangeHandler,
  FilterDefinition, 
  InputType
} from '../../../definitions/filter'
import useDebouncedCallback from '../../../hooks/useDebouncedCallback'

interface TextFilterProps<T, U extends InputType> {
  value?: unknown
  filterDefinition: FilterDefinition<T, U>
  changeHandler: SingleFilterChangeHandler<T>
  type?: string
}

const TextFilter = <T extends any, U extends InputType>(props: TextFilterProps<T, U>) => {
  const propsValue = props.value as string
  const type = props.type
  const [value, setValue] = useState<string | number>(propsValue)
  const { filterDefinition, changeHandler } = props

  const handleChange = useDebouncedCallback(
    (val: string | number | undefined) => {
      changeHandler(filterDefinition.name, val)
    },
    [changeHandler, filterDefinition],
    1000
  )

  const onChangeCallback = useCallback(
    (_event, data: InputOnChangeData) => {
      let val = data.value
      if (filterDefinition.mask) {
        const regex = new RegExp(filterDefinition.mask)
        if (!regex.test(val)) {
          return
        }
      }
      const newValue = type === 'number' ? Number(val) : val
      setValue(newValue)

      handleChange(newValue)
    },
    [filterDefinition, type, handleChange]
  )

  const name = filterDefinition.name as string
  const label = filterDefinition.label || capitalize(name)

  return (
    <Form.Input
      label={label}
      value={value}
      onChange={onChangeCallback}
      icon={filterDefinition.icon}
      placeholder={`Filter by ${label}`}
      type={props.type ?? 'text'}
    />
  )
}

export default TextFilter
