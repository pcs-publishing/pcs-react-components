import React, { useState } from 'react'
import Confirm, { ConfirmProps } from './Confirm'
import Button from '../../Button'

export default {
  title: 'Popups/Confirm',
  component: Confirm
}

const Default = (props: ConfirmProps) => {
  const [open, setOpen] = useState(false)

  return <>
    <Button onClick={() => setOpen(true)}>Open</Button>
    <Confirm {...props} open={open} close={() => setOpen(false)} />
  </>
}

export const Basic = Default.bind({})

Basic.args = {
  title: 'Drop The Bombs?',
  message: 'Are you sure you want to delete the human race?'
}

export const Custom = Default.bind({})

Custom.args = {
  title: 'Which Came First?',
  message: 'Which came first, the chicken or the egg?',
  confirmButtonText: 'Chicken',
  cancelButtonText: 'Egg',
  confirmButtonColor: 'orange',
  cancelButtonColor: 'purple'
}

export const Component = Default.bind({})

Component.args = {
  title: 'Message as a component',
  message: (
    <div>
      <img src="https://media4.giphy.com/media/Sw6fiilaRDWz7KW5x5/giphy.gif" alt="gif" />
    </div>)
}

