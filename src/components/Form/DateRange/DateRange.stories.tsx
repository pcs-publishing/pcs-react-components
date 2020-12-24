import React, { useState } from 'react'
import DateRange from './DateRange'
import { DateRangeProps, DateRangeOptions } from '.'
import { Form } from 'semantic-ui-react'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default {
  title: 'Form/Date Range',
  component: DateRange,
  argTypes: { onChange: { action: 'change' } }
}

export const Example = (props: DateRangeProps) => {
  const [value, setValue] = useState<DateRangeOptions | undefined>({
    start: new Date(2020, 11, 14),
    end: new Date()
  })

  const handleChange = (value: DateRangeOptions) => {
    setValue(value)
    props.onChange(value)
  }

  return <Form>
    <DateRange {...props} value={value} onChange={handleChange} />
  </Form>
}

Example.args = {
  label: 'Date Range'
}