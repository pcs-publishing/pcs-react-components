import React, { useCallback, SyntheticEvent } from 'react'
import { Dropdown, Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'

const DropdownField = (props: FieldProps) => {
  const { onChange, field, defaultValue, value, allValues } = props
  const { options, label, autoFocus } = field
  const onValueChange = useCallback(
    (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
      const { value } = data
      onChange(field.key, value)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <Form.Field>
      <label>{label}</label>
      <Dropdown
        autoFocus={!!autoFocus}
        placeholder={label}
        label={label}
        options={options}
        fluid
        labeled
        selection
        defaultValue={defaultValue}
        onChange={onValueChange}
        clearable={true}
        error={error ? true : false}
      />
    </Form.Field>
  )
}

export default DropdownField