import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import TextAreaModal, { TextAreaModalProps } from './TextAreaModal'

export default {
  title: 'Popups/Textarea Modal',
  component: TextAreaModal,
  argTypes: { onSubmit: { action: 'submit' } }
}

export const Example = (props: TextAreaModalProps) => {
  const [open, setOpen] = useState(false)
  const handleSubmit = (...args) => {
    setOpen(false)
    props.onSubmit(...args)
  }

  return <>
    <Button content="Open" onClick={() => setOpen(true)} />
    <TextAreaModal {...props} open={open} close={() => setOpen(false)} onSubmit={handleSubmit} />
  </>
}

Example.args = {
  header: 'Tell Us What You Think',
  height: 300,
  placeholder: 'Come on tell me...',
}