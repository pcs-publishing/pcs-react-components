import React from 'react'
import FullScreenLoadingMask from './FullScreenLoadingMask'
import styled from '../../theme-styled';
import { LoadingMaskProps } from '../LoadingMask/LoadingMask';

export default {
  title: 'Fullscreen Loading Mask',
  component: FullScreenLoadingMask
}


const Container = styled.div`
  width: 300px;
  height: 200px;
`


const Template = (props: LoadingMaskProps) => {
  return <Container>
    <FullScreenLoadingMask {...props} />
  </Container>
}

export const Example = Template.bind({})

Example.args({
  active: false
})
