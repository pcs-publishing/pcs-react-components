import React, { useState } from 'react'
import EditableLabel from './EditableLabel'

export default {
  title: 'Editable Label',
  component: EditableLabel
}

export const Example = () => {
  const [value, setValue] = useState('Starting Value')
  return <EditableLabel value={value} onChange={setValue} />
}

