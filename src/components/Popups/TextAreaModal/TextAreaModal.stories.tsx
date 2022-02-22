import React, { useState } from 'react'
import Button from '../../Semantic-Themed/Button'
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

  return (
    <>
      <Button content="Open" onClick={() => setOpen(true)} />
      <TextAreaModal
        {...props}
        open={open}
        close={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export const TextAreaModalWithValidation = (props: TextAreaModalProps) => {
  const [open, setOpen] = useState(false)
  const handleSubmit = (value: string) => {
    setOpen(false)
    props.onSubmit(value)
  }
  const handleValidation = (value: string) => {
    return value.length > 10
  }

  return (
    <>
      <Button content="Open" onClick={() => setOpen(true)} />
      <TextAreaModal
        {...props}
        open={open}
        close={() => setOpen(false)}
        onSubmit={handleSubmit}
        isFormValid={handleValidation}
        validationMessage={'Please enter 10 characters or more'}
      />
    </>
  )
}

Example.args = {
  header: 'Tell Us What You Think',
  height: 300,
  placeholder: 'Come on tell me...'
}

TextAreaModalWithValidation.args = {
  header: 'Add notes',
  height: 300,
  placeholder: 'Enter notes here...'
}
