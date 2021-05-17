import React from 'react'
import Version, { VersionProps } from './Version'

export default {
  title: 'Version',
  component: Version
}

const Template = (props: VersionProps) => {
  return <Version {...props} />
}

const Example = Template.bind({})
Example.props = { version: '1.0.1' }