import React, { useState } from 'react'
import ViewFileWindow, { ViewFileWindowProps } from './ViewFileWindow'
import Button from '../Button'

export default {
  title: 'View File Window',
  component: ViewFileWindow
}

const Template = (props: ViewFileWindowProps) => {
  const [open, setOpen] = useState(false)
  return <>
    <Button content="Open" onClick={() => setOpen(true)} />
    <ViewFileWindow {...props} file={open ? props.file : undefined} onClose={() => setOpen(false)} />
  </>
}

export const PdfFile = Template.bind({})

PdfFile.args = {
  file: {
    url: 'https://cors-anywhere.herokuapp.com/https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    name: 'Dummy PDF file',
    mimeType: 'application/pdf'
  }
}

export const ImageFile = Template.bind({})

ImageFile.args = {
  file: {
    url: 'https://cdn.mos.cms.futurecdn.net/UwYhuHgLaRtpq9eXUBuwaM.jpg',
    name: 'Screenshot',
    mimeType: 'image/jpeg'
  }
}

export const TextFile = Template.bind({})

TextFile.args = {
  file: {
    url: '',
    name: 'Bit of poetry and that',
    mimeType: 'text/plain',
    textContent: `To see a World in a Grain of Sand
               And a Heaven in a Wild Flower
               Hold Infinity in the palm of your hand
               And Eternity in an hour`
  }
}