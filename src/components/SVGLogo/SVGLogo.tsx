import React from 'react'
import styled from '../../theme-styled'
import { ReactSVG } from 'react-svg'
import { isNumber } from 'lodash'

export interface SVGLogoProps {
  src: string
  size: number | string
  className?: string
  onClick?: () => void
}

const Fallback = styled.div<{ $size: string }>`
  max-width: ${props => props.$size};
  max-height: ${props => props.$size};
`

const Container = styled.div<{ $pointer: boolean, $size: string }>`
  max-width: ${props => props.$size} !important;
  max-height: ${props => props.$size} !important;
  display: inline-block;
  cursor: ${props => props.$pointer ? 'pointer' : 'default'};
`

const SVGLogo = (props: SVGLogoProps) => {
  const sizeAsString = isNumber(props.size) ? `${props.size}px` : props.size

  const sizeProps = {
    $size: sizeAsString,
  }

  return <Container className={props.className} $pointer={!!props.onClick} {...sizeProps}>
    <ReactSVG
      src={props.src}
      loading={() => <Fallback {...sizeProps} />}
      role="img"
      beforeInjection={(svg) => {
        svg.setAttribute('style', `max-width: 100%; max-height: 100%;`)
      }}
    />
  </Container>
}

export default SVGLogo
