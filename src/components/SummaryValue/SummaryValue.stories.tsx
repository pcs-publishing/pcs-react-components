import React from 'react'
import SummaryValue, { SummaryValueProps } from './SummaryValue'

export default {
  title: 'Summary Value',
  component: SummaryValue
}

const Template = (props: SummaryValueProps) => <SummaryValue {...props} />

export const Example = Template.bind({})

Example.args = {
  label: 'Example',
  value: '1,000',
  tag: false
}

export const CustomColor = Template.bind({})

CustomColor.args = {
  label: 'Custom Color',
  value: 'Green',
  tag: false,
  color: 'green'
}

export const Tag = Template.bind({})

Tag.args = {
  label: 'Errors',
  color: 'red',
  value: 500,
  tag: true
}
