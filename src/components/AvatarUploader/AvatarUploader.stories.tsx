import React from 'react'
import AvatarUploader, { AvatarUploaderProps } from './AvatarUploader'
import 'react-image-crop/dist/ReactCrop.css'

export default {
  title: 'AvatarUploader',
  component: AvatarUploader,
  argTypes: { onUpload: { action: 'upload' } }
}



const Template = (props: AvatarUploaderProps) => (
  <AvatarUploader {...props} />)

export const Example = Template.bind({

})
