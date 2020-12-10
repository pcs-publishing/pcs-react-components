import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'

const DateField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props
  const error = field.error ? field.error(value, allValues ?? {}) : undefined
  const onDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onChange(field.key, value)
    },
    [onChange, field]
  )

  return (
    <Form.Input
      autoFocus={!!field.autoFocus}
      label={field.label}
      value={value}
      type={'date'}
      onChange={onDateChange}
      disabled={!!field.disabled}
      error={error}
    />
  )
}

export default DateField
