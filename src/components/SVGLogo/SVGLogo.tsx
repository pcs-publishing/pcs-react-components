import React from 'react'
import styled from '../../theme-styled'
import { ReactSVG } from 'react-svg'

export interface SVGLogoProps {
  src: string
  size: number
  className?: string
  onClick?: () => void
}

const Fallback = styled.div<{ $size: number }>`
  max-width: ${props => props.$size}px;
  max-height: ${props => props.$size}px;
`

const Container = styled.div<{ $pointer: boolean, $size: number }>`
  max-width: ${props => props.$size}px !important;
  max-height: ${props => props.$size}px !important;
  display: inline-block;
  cursor: ${props => props.$pointer ? 'pointer' : 'default'};
`

const SVGLogo = (props: SVGLogoProps) => {
  const sizeProps = {
    $size: props.size,
  }

  return <Container className={props.className} $pointer={!!props.onClick} {...sizeProps}>
    <ReactSVG
      src={props.src}
      loading={() => <Fallback {...sizeProps} />}
      role="img"
      beforeInjection={(svg) => {
        svg.setAttribute('style', `width: ${props.size}px; height: ${props.size}px;`)
      }}
    />
  </Container>
}

export default SVGLogo
