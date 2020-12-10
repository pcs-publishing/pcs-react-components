import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import LoadingMask from '../../LoadingMask'

export interface ImageLoaderProps {
  src: string
  alt: string
  title?: string
  className?: string
  onError?: () => void
  onClick?: () => void
}

const Image = styled.img<{ $visible: boolean }>`
  opacity: ${(props) => (props.$visible ? '1' : '0')};
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
      <Image {...props} onLoad={onLoad} onError={onError} $visible={!loading} />
    </LoadingMask>
  )
}

export default ImageLoader
