import React, { useCallback, useState } from 'react'
import { Form, InputOnChangeData } from 'semantic-ui-react'
import { capitalize } from 'lodash'

import {
  SingleFilterChangeHandler,
  FilterDefinition
} from '../../../definitions/filter'
import useDebouncedCallback from '../../../hooks/useDebouncedCallback'

interface TextFilterProps<T, U extends string> {
  value?: unknown
  filterDefinition: FilterDefinition<T, U>
  changeHandler: SingleFilterChangeHandler<T>
  type?: string
}

const TextFilter = <T extends any, U extends string>(props: TextFilterProps<T, U>) => {
  const value = props.value || '' as string | number | undefined
  const type = props.type
  const { filterDefinition, changeHandler } = props

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
      changeHandler(filterDefinition.name, newValue)
    },
    [filterDefinition, type, changeHandler]
  )

  const name = filterDefinition.name as string
  const label = filterDefinition.label || capitalize(name)

  return (
    <Form.Input
      label={label}
      value={value || ''}
      onChange={onChangeCallback}
      icon={filterDefinition.icon}
      placeholder={`Filter by ${label}`}
      type={props.type ?? 'text'}
    />
  )
}

export default TextFilter
