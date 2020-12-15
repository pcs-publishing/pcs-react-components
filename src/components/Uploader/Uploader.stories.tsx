import React from 'react'
import Uploader, { UploaderProps } from './Uploader'
import styled from '../../theme-styled'

export default {
  title: 'Uploader',
  component: Uploader,
  argTypes: { onDrop: { action: 'drop' }}
}

const Container = styled.div`
  width: 500px;
  padding: 10px;
`

const onDrop = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

export const FileUploader = (props: UploaderProps) => (
  <Container>
    <Uploader {...props} uploadType="file" onDrop={(file) => onDrop().then(() => props.onDrop(file))} />
  </Container>
)

export const ImageUploader = (props: UploaderProps) => (
  <Container>
    <Uploader
      {...props}
      uploadType="image"
      acceptMimeTypes={['image/jpeg', 'image/png']}
      onDrop={(file) => onDrop().then(() => props.onDrop(file))}
    />
  </Container>
)
