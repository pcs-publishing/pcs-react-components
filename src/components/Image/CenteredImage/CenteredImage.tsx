import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import ImageLoader from '../ImageLoader'

export interface CenteredImageProps {
  className?: string
  src?: string
  alt: string
  title?: string
  fallback?: React.ReactElement
  maxWidth: number | string
  maxHeight: number | string
  onClick?: () => void
  forwardRef?: React.Ref<HTMLImageElement>
}

const getSizeValue = (value: number | string): string => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const Container = styled.div<CenteredImageProps>`
  position: relative;
  width: ${(props) => getSizeValue(props.maxWidth)};
  height: ${(props) => getSizeValue(props.maxHeight)};
`

const Image = styled(ImageLoader) <{ onClick?: () => void }>`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  ${props => props.onClick ? 'cursor: pointer;' : ''}
`

const CenteredImage = (props: CenteredImageProps) => {
  const { fallback, src, alt, title } = props
  const [useFallback, setUseFallback] = useState(false)

  const { onClick, className, ...otherProps } = props

  const onError = useCallback(() => {
    if (fallback) setUseFallback(true)
  }, [fallback])

  // On src change, re-attempt to show the image
  useEffect(() => {
    setUseFallback(false)
  }, [src])

  const content =
    (!src || useFallback) && fallback ? (
      fallback
    ) : (
      <Image
        src={src as string}
        alt={alt as string}
        // className={className}
        title={title}
        onError={onError}
        onClick={props.onClick}
        forwardRef={props.forwardRef}
      />
    )

  return <Container {...otherProps}>{content}</Container>
}

export default CenteredImage
