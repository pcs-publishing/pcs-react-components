import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'
import Input from '../../../Input'

const TextField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props
  const inputType = field.inputType || 'text'
  const onTextChange = useCallback(
    (value: string) => {
      onChange(field.key, value)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <Input
      onChange={onTextChange}
      value={value as string | undefined}
      label={field.label}
      inputProps={{
        autoFocus: !!field.autoFocus,
        type: inputType,
        disabled: !!field.disabled,
        error: error
      }}
    />
  )
}

export default TextField
