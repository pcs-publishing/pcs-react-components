import React from 'react'
import {
  TextArea as SemanticTextArea,
  TextAreaProps as SemanticTextAreaProps,
  Form
} from 'semantic-ui-react'

export interface TextAreaProps {
  value?: string | number
  onChange: (value?: string | number) => void
  textAreaProps?: SemanticTextAreaProps
  label: string
}

const TextArea = ({ value, onChange, textAreaProps, label }: TextAreaProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <SemanticTextArea
        value={value}
        onChange={(_, { value }) => onChange(value)}
        {...textAreaProps}
      />
    </Form.Field>
  )
}

export default TextArea
