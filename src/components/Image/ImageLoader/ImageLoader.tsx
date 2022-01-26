import React, { useState, useCallback } from 'react'
import LoadingMask from '../../LoadingMask'
import { omit } from 'lodash'

export interface ImageLoaderProps {
  src: string
  alt: string
  title?: string
  className?: string
  onError?: () => void
  onClick?: () => void
  forwardRef?: React.Ref<HTMLImageElement>
}

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
      <img {...omit(props, ['forwardRef'])} ref={props.forwardRef} className={props.className} onLoad={onLoad} onError={onError} style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 250ms ease-in'
      }} />
    </LoadingMask>
  )
}

export default ImageLoader
