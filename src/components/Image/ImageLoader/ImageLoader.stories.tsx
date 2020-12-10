import React from 'react'
import ImageLoader, { ImageLoaderProps } from './ImageLoader'
import styled from 'styled-components'

export default {
  title: 'Image/ImageLoader',
  component: ImageLoader,
  argTypes: { onError: { action: 'error' }, onClick: { action: 'click'}}
}

const Container = styled.div`
  max-width: 500px;
  max-height: 500px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const Template = (args: ImageLoaderProps) => <Container><ImageLoader {...args} /></Container>

export const LoadLargeImage = Template.bind({})

LoadLargeImage.args = {
  src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9229685a-7fc9-46ae-959d-ed7ebcc9bca8/d6pztlh-0d6c631e-afd9-4316-ae22-c0a05ff7a614.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOTIyOTY4NWEtN2ZjOS00NmFlLTk1OWQtZWQ3ZWJjYzliY2E4XC9kNnB6dGxoLTBkNmM2MzFlLWFmZDktNDMxNi1hZTIyLWMwYTA1ZmY3YTYxNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.F9bCkd5sa7H5aGvuDJNfeLBBlNThbiNHLZ-8b_2rhrU',
  alt: 'image'
}