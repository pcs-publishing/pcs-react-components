import React from 'react'
import UploadButton, { UploadButtonProps } from './UploadButton'

export default {
  component: UploadButton,
  title: 'Buttons/Upload Button',
  argTypes: {
    onClick: { action: 'click', description: 'Open File to choose from.' },
    onChangeFile: {
      action: 'onChangeFile',
      description:
        'When selecting a file the onChangeFile function passed down to the component is fired off. Which passes a File | null to the function.'
    }
  }
}

export const Default = (props: UploadButtonProps) => {
  return <UploadButton {...props} />
}
