import React, { useState } from 'react'
import { DropdownItemProps, Form } from 'semantic-ui-react'
import Dropdown from './Dropdown'

export default {
  title: 'Dropdown',
  component: Dropdown
}

export const Example = () => {
  const [value, setValue] = useState<undefined | string>(undefined)
  const options: DropdownItemProps[] = [
    { text: 'Option 1', value: 'option1', key: 1 },
    { text: 'Option 2', value: 'option2', key: 2 },
    { text: 'Option 3', value: 'option3', key: 3 }
  ]
  return (
    <Form>
      <Dropdown
        value={value}
        onChange={(value) => setValue(value as string)}
        options={options}
        dropdownProps={{ clearable: true }}
        label="Options"
      />
    </Form>
  )
}
