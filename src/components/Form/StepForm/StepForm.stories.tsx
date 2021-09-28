import React from 'react'
import StepForm from '../StepForm'
import { StepFormProps } from './StepForm'

export default {
  title: 'Form/Step Form',
  component: StepForm,
  argTypes: { onSubmit: { action: 'submit' } }
}

const Template = (props: StepFormProps) => {
  return <StepForm {...props} />
}

export const Example = Template.bind({})

Example.args = {
  header: 'Example Form',
  submitButtonText: 'Submit The Form',
  valid: true,
  loading: false,
  stepsMaxWidth: 400,
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
