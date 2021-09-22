import React, { useState } from 'react'
import FilenameField, { FilenameFieldProps } from './FilenameField';
import styled from 'styled-components'

export default {
  title: 'Form/Filename Field',
  component: FilenameField,
  args: { onChange: { action: '' } }
}

const Container = styled.div`
  padding: 30px;
  width: 500px;
`

const Template = (props: FilenameFieldProps) => {
  const [value, setValue] = useState(props.value)
  return <Container>
    <FilenameField value={value} onChange={setValue} />
  </Container>
}

export const PdfField = Template.bind({})

PdfField.args = {
  value: 'advert.pdf'
}

export const JpgField = Template.bind({})

JpgField.args = {
  value: 'preview.jpg'
}
