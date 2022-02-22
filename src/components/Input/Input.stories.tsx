import React, { useState } from 'react'
import Input from './Input'
import Form from '../Semantic-Themed/Form'

export default {
  title: 'Input',
  component: Input
}

export const Example = () => {
  const [value, setValue] = useState<undefined | string>(undefined)
  return (
    <Form>
      <Input onChange={(value) => setValue(value)} value={value} label="Name" />
    </Form>
  )
}
