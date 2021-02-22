import React from 'react'
import styled from 'styled-components'
import AutoForm from './AutoForm'
import { AutoFormProps } from './definitions'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default {
  title: 'Form/AutoForm',
  component: AutoForm,
  argTypes: { onSave: { action: 'save' }, onCancel: { action: 'cancel' } }
}

const Container = styled.div`
  max-width: 350px;
`

const Template = (props: AutoFormProps) => {
  return (
    <Container>
      <AutoForm {...props} />
    </Container>
  )
}

export const Example = Template.bind({})

Example.args = {
  fields: [
    {
      key: 'title',
      label: 'Title',
      type: 'dropdown',
      required: true,
      options: ['Mr', 'Miss', 'Ms', 'Dr', 'Mx'].map((v) => ({
        key: v,
        text: v,
        value: v
      }))
    },
    {
      key: 'forename',
      label: 'Forename',
      type: 'text',
      required: true
    },
    {
      key: 'surname',
      label: 'Surname',
      type: 'text',
      required: true
    },
    {
      key: 'dob',
      label: 'Date of Birth',
      type: 'date'
    },
    {
      key: 'colour',
      label: 'Favorite Colour',
      type: 'color'
    },
    {
      key: 'start',
      label: 'Start Time',
      type: 'time'
    },
    {
      key: 'admin',
      label: 'Is Admin',
      type: 'boolean'
    },
    {
      key: 'prepay',
      label: 'Prepay',
      type: 'boolean'
    },
    {
      key: 'filename',
      label: 'Filename',
      type: 'filename'
    },
    {
      key: 'holiday',
      label: 'Holiday Date Range',
      type: 'daterange'
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea'
    }
  ],
  compact: false,
  size: 'normal',
  defaultValue: {
    title: 'Mr',
    forename: 'Bob',
    surname: 'Kerman',
    filename: 'image.jpg',
    admin: false,
    prepay: true
  }
}
