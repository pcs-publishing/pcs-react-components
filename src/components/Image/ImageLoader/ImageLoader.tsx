import React, { useState, useCallback } from 'react'
import LoadingMask from '../../LoadingMask'
import { omit } from 'lodash'
import styled from 'styled-components'

export interface ImageLoaderProps {
  src: string
  alt: string
  title?: string
  className?: string
  onError?: () => void
  onClick?: () => void
  forwardRef?: React.Ref<HTMLImageElement>
}

const Image = styled.img<{ $loading: boolean }>`
  opacity: ${props => props.$loading ? 0 : 1};
  transition: opacity 250ms ease-in;
`

const ImageLoader = (props: ImageLoaderProps) => {
  const [loading, setLoading] = useState(true)

  const onLoad = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  const onError = useCallback(() => {
    setLoading(false)
    if (props.onError) {
      props.onError()
    }
  }, [props, setLoading])

  return (
    <LoadingMask active={loading} message="" loaderProps={{ size: 'small' }}>
      <Image {...omit(props, ['forwardRef', 'className'])} ref={props.forwardRef} className={props.className} onLoad={onLoad} onError={onError} $loading={loading} />
    </LoadingMask>
  )
}

export default ImageLoader
