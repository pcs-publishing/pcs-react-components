import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import TextArea from './TextArea'

export default {
  title: 'TextArea',
  component: TextArea
}

export const Example = () => {
  const [value, setValue] = useState<undefined | string | number>(undefined)
  return (
    <Form>
      <TextArea
        onChange={(value) => setValue(value)}
        value={value}
        label="Description"
      />
    </Form>
  )
}
