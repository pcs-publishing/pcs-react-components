import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import ColorPicker from '../../ColorPicker'
import { FieldProps } from '../definitions'

const ColorField = (props: FieldProps) => {
  const { field, onChange } = props

  const recommendedColors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ff6b81'
  ]

  const onColorChange = useCallback(
    (value: string) => {
      onChange(field.key, value)
    },
    [onChange, field]
  )

  return (
    <Form.Field>
      <label>{field.label}</label>
      <ColorPicker
        value={props.value as string}
        onChange={onColorChange}
        presetColors={recommendedColors}
      />
    </Form.Field>
  )
}

export default ColorField
