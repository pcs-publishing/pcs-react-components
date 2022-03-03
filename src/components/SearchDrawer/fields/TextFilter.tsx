import React, { useCallback, useState, useEffect } from 'react'
import { Form, InputOnChangeData } from 'semantic-ui-react'
import { capitalize } from 'lodash'

import {
  SingleFilterChangeHandler,
  FilterDefinition
} from '../../../definitions/filter'
import useDelayedFunction from '../../../hooks/useDelayedFunction'
import useIsTyping from '../../../hooks/useIsTyping'

interface TextFilterProps<T, U extends string> {
  value?: unknown
  filterDefinition: FilterDefinition<T, U>
  changeHandler: SingleFilterChangeHandler<T>
  type?: string
}

const DELAY = 500

const TextFilter = <T extends any, U extends string>(props: TextFilterProps<T, U>) => {
  const propsValue = props.value as string
  const type = props.type
  const [value, setValue] = useState<string | number>(propsValue)
  const [isTyping, setIsTyping] = useIsTyping(value, DELAY)
  const { filterDefinition, changeHandler } = props

  const handleChange = useDelayedFunction(
    (val: string | number | undefined) => {
      changeHandler(filterDefinition.name, val)
    },
    DELAY
  )

  useEffect(() => {
    if (!isTyping) {
      setValue(propsValue)
    }
  }, [isTyping, propsValue])


  const onChangeCallback = useCallback(
    (_event: unknown, data: InputOnChangeData) => {
      let val = data.value
      if (filterDefinition.mask) {
        const regex = new RegExp(filterDefinition.mask)
        if (!regex.test(val)) {
          return
        }
      }
      const newValue = type === 'number' ? Number(val) : val

      setValue(newValue)
      setIsTyping(true)

      handleChange(newValue)
    },
    [filterDefinition, type, handleChange]
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


