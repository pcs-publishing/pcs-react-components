import React from 'react'
import LoadingMask, { LoadingMaskProps } from './LoadingMask'
import styled from 'styled-components'

export default {
  title: 'Loading Mask',
  component: LoadingMask
}

const TextContainer = styled.div`
  background-color: #3b4558;
  padding: 20px;
  margin: 10px;
  height: 300px;
  border-radius: 10px;
  color: white;
`

const Template = (props: LoadingMaskProps) => {
  return <LoadingMask {...props}>
    <TextContainer>
      This is the content that is going to be masked
    </TextContainer>
  </LoadingMask>
}

export const Example = Template.bind({})

Example.args = {
  active: true,
  message: 'Loading'
}