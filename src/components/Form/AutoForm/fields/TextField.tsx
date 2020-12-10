import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'


const TextField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props
  const inputType = field.inputType || 'text'
  const onTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onChange(field.key, value)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <Form.Input
      autoFocus={!!field.autoFocus}
      label={field.label}
      value={value}
      type={inputType}
      onChange={onTextChange}
      disabled={!!field.disabled}
      error={error}
    />
  )
}

export default TextField