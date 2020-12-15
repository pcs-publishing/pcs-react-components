import React from 'react'
import FilePreview, { FilePreviewProps } from './FilePreview'

export default {
  title: 'File Preview',
  component: FilePreview
}

const Template = (props: FilePreviewProps) => <FilePreview {...props} />

const Example = Template.bind({})

Example.args = {
  previewImageUrl: 'https://media.giphy.com/media/fXVqtkPWPcGk8WXmdn/giphy.gif',
  fileDownloadUrl: 'https://media.giphy.com/media/fXVqtkPWPcGk8WXmdn/giphy.gif'
}