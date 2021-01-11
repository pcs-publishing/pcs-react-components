import React, { useState } from 'react'
import PdfViewerWindow, { PdfViewerWindowProps } from './PdfViewerWindow';
import Button from '../Button'

export default {
  title: 'Pdf Viewer Window',
  component: PdfViewerWindow
}

const Template = (props: PdfViewerWindowProps) => {
  const [open, setOpen] = useState(false)

  return <>
    <Button content="Open Window" onClick={() => setOpen(true)} />
    <PdfViewerWindow open={open} close={() => setOpen(false)} {...props} />
  </>
}

export const Example = Template.bind({})

Example.args = {
  title: 'PDF Window',
  url: 'https://cors-anywhere.herokuapp.com/https://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf'
}