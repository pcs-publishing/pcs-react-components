import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'

const TextField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props

  const rows = field.rows ?? 4

  const onTextAreaChange = useCallback(
    (e: unknown) => {
      const { target } = e as { target: { value: string } }
      const value = target.value
      onChange(field.key, value)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <Form.TextArea
      autoFocus={!!field.autoFocus}
      label={field.label}
      value={value as string | number | undefined}
      onChange={onTextAreaChange}
      disabled={!!field.disabled}
      error={error}
      rows={rows}
    />
  )
}

export default TextField
