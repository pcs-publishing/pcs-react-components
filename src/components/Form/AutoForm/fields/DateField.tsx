import React, { useCallback } from 'react'
import { Form } from 'semantic-ui-react'
import SingleDatePicker from '../../SingleDatePicker'
import { FieldProps } from '../definitions'

const DateField = (props: FieldProps) => {
  const { onChange, field, value } = props
  const onDateChange = useCallback(
    (value: Date) => {
      onChange(field.key, value)
    },
    [onChange, field]
  )


  return <Form.Field>
    {props.field.label ? <label>{props.field.label}</label> : null}
    <SingleDatePicker date={value as Date || new Date()} onChange={onDateChange} />
  </Form.Field>
}



export default DateField
