import React, { useCallback } from 'react'
import { FieldProps } from '../definitions'
import TextArea from '../../../TextArea'

const TextField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props

  const rows = field.rows ?? 4

  const onTextAreaChange = useCallback(
    (value?: string | number) => {
      onChange(field.key, value)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <TextArea
      value={value as string | number | undefined}
      label={field.label}
      onChange={onTextAreaChange}
      textAreaProps={{
        autoFocus: !!field.autoFocus,
        disabled: !!field.disabled,
        error,
        rows
      }}
    />
  )
}

export default TextField
