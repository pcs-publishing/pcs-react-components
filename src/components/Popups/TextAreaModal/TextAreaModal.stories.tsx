import React, { useState } from 'react'
import Button from '../../Button'
import TextAreaModal, { TextAreaModalProps } from './TextAreaModal'

export default {
  title: 'Popups/Textarea Modal',
  component: TextAreaModal,
  argTypes: { onSubmit: { action: 'submit' } }
}

export const Example = (props: TextAreaModalProps) => {
  const [open, setOpen] = useState(false)
  const handleSubmit = (value: string) => {
    setOpen(false)
    props.onSubmit(value)
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