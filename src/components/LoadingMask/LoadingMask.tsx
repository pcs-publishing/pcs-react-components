import React, { ReactNode } from 'react'
import { Dimmer, Loader, Segment, LoaderProps } from 'semantic-ui-react'
import styled from 'styled-components'

export interface LoadingMaskProps {
  active: boolean
  message?: string
  children?: ReactNode
  loaderProps?: LoaderProps
}

const Container = styled(Segment)`
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
  width: 100%;
`

const LoadingMask = (props: LoadingMaskProps) => {
  return (
    <Container basic>
      <Dimmer active={props.active} inverted>
        <Loader size="medium" inverted {...props.loaderProps}>
          {props.message ?? 'Loading...'}
        </Loader>
      </Dimmer>
      {props.children}
    </Container>
  )
}

export default LoadingMask
