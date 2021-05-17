import React from 'react'
import { Portal } from 'semantic-ui-react'
import styled from '../../theme-styled'
import LoadingMask, { LoadingMaskProps } from '../LoadingMask/LoadingMask'

const InnerContainer = styled.div`
  width: 100vh;
  height: 100vh;
  position: fixed;
`

const FullScreenLoadingMask = (props: Omit<LoadingMaskProps, 'children'>) => {
  return <Portal>
    <LoadingMask {...props}>
      <InnerContainer />
    </LoadingMask>
  </Portal>
}

export default FullScreenLoadingMask
