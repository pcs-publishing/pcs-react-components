import React from 'react'
import { FormInputProps, Form, Input as SemanticInput } from 'semantic-ui-react'

export interface InputProps {
  onChange: (value: string) => void
  value?: string
  inputProps?: FormInputProps
  label: string
}

const Input = ({ onChange, value, inputProps, label }: InputProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <SemanticInput
        onChange={(_, { value }) => onChange(value)}
        value={value}
        {...inputProps}
      />
    </Form.Field>
  )
}

export default Input
