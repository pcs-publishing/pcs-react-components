import React, { useState } from 'react'
import LinkButton, { LinkButtonProps } from './LinkButton'

export default {
  component: LinkButton,
  title: 'Buttons/Link Button',
  argTypes: {
    onChange: { action: 'change' }
  }
}

const Template = (props: LinkButtonProps) => {
  const [linked, setLinked] = useState<boolean>(false)
  const handleChange = (value: boolean) => {
    setLinked(value)
    props.onChange(value)
  }
  return <LinkButton {...props} linked={linked} onChange={handleChange} />
}

export const Example = Template.bind({})
Example.args = {}
