import React, { useState } from 'react'
import SingleDatePicker, { SingleDatePickerProps } from './SingleDatePicker'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default {
  title: 'Form/Single Date Picker',
  component: SingleDatePicker,
  argTypes: { onChange: { action: 'change ' } }
}

export const Example = (props: SingleDatePickerProps) => {
  const [date, setDate] = useState(new Date())
  const onChange = (date: Date) => {
    setDate(date)
    props.onChange(date)
  }
  return <SingleDatePicker date={date} onChange={onChange} />
}
