import React from 'react'
import CollapsiblePanel, { CollapsiblePanelProps } from './CollapsiblePanel';


export default {
  title: 'CollapsiblePanel',
  component: CollapsiblePanel
}



const Template = (props: CollapsiblePanelProps) => (
  <CollapsiblePanel {...props} />)

export const Collapsed = Template.bind({})

Collapsed.args = {
  title: 'Example Title',
  initialState: 'collapsed'
}

export const Expanded = Template.bind({})

Expanded.args = {
  title: 'Example Title',
  initialState: 'expanded'
}