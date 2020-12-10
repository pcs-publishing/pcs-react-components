import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'

const TimeField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props
  const onTimeChange = useCallback(
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
      type={'time'}
      onChange={onTimeChange}
      disabled={!!field.disabled}
      error={error}
    />
  )
}

export default TimeField