import React from 'react'
import Steps, { StepsProps } from './Steps'

export default {
  title: 'Steps',
  component: Steps
}

const Template = (props: StepsProps) => <Steps {...props} />

export const Example = Template.bind({})

Example.args = {
  steps: [{
    key: 'first',
    title: 'First Step',
    icon: 'glass martini',
    description: 'description of the first step',
    completed: false,
    stepContent: <p>The content for the first step</p>
  }, {
    key: 'second',
    title: 'Second Step',
    icon: 'weight',
    description: 'description of the second step',
    completed: false,
    stepContent: <p>The content for the second step</p>
  }, {
    key: 'third',
    title: 'Third Step',
    icon: 'beer',
    description: 'description of the third step',
    completed: false,
    stepContent: <p> The content for the third step</p>
  }]
}

