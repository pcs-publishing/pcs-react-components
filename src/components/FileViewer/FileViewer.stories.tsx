import React, { useState } from 'react'
import SingleFileComponent from './SingleFileComponent'
import FileViewer from './FileViewer'
import FileViewerWindow, { FileViewerWindowProps } from './FileViewerWindow'
import { Button } from 'semantic-ui-react'

export default {
  title: 'File Viewer',
  component: FileViewer,
  argTypes: { onUpload: { action: 'upload' }, onDeleteClick: { action: 'delete' } }
}

interface TestFileRecord {
  src: string,
  title: string,
  mimeType: string
}

export const Window = (props: FileViewerWindowProps<TestFileRecord>) => {
  const [open, setOpen] = useState(false)
  return <>
    <Button content="Open" onClick={() => setOpen(true)} />
    <FileViewerWindow {...props} open={open} close={() => setOpen(false)} />
  </>
}

Window.args = {
  title: 'File Viewer',
  typeOfFile: 'gifs',
  acceptedMimeTypes: ['image/jpeg', 'image/gif'],
  maxFileSize: 10_000_000,
  records: generateTestRecordsFromSrcs([
    'https://media4.giphy.com/media/J47zreUx5lBT2SqjUY/200.gif',
    'https://media.tenor.com/images/5f310b0851eedaef627a5d945ef2796d/tenor.gif',
    'https://media2.giphy.com/media/Sw6fiilaRDWz7KW5x5/giphy.gif',
    'https://media0.giphy.com/media/oVzm4vXdmYToRbMOZc/giphy.gif',
    'https://media.giphy.com/media/elK9EJTjefNmfP8WKj/giphy.gif',
    'https://media.giphy.com/media/fXVqtkPWPcGk8WXmdn/giphy.gif',
    'https://media0.giphy.com/media/VdhTYle3b9a6jtO7FJ/giphy.gif',
    'https://media0.giphy.com/media/J1j6wzyprIjN0dFZoc/giphy.gif',
    'https://media2.giphy.com/media/a4wpT0SN0EltRgcfoa/giphy.gif',
    'https://media1.giphy.com/media/KBDzqHidthiHbeus6B/giphy.gif',
    'https://media.tenor.com/images/87cdac8575f743e6737c018d52a0eca0/tenor.gif',
    'https://media3.giphy.com/media/KEGmroyX9sfb5TSOLR/giphy.gif',
    'https://media4.giphy.com/media/cawM99wkizZBe/source.gif',
    'https://media.giphy.com/media/2GqhGZEwKI9ZRW3BjL/giphy.gif',
    'https://media.giphy.com/media/K2HsuAljIiDOTXtdEk/giphy.gif',
    'https://media.giphy.com/media/UdRuoaokXADkOelesh/giphy.gif',
    'https://i.kym-cdn.com/photos/images/original/001/466/409/d4b.gif',
    'https://i.pinimg.com/originals/ca/66/8a/ca668ad677ec86bcfd55691ee853d603.gif',
    'https://media1.giphy.com/media/5OW9D8sfzccttn3MwL/giphy.gif',
    'https://media1.giphy.com/media/HFbtg3SmlDx8f9g4dJ/source.gif',
    'https://i.pinimg.com/originals/09/e1/da/09e1da7bc8ef753e9810c7bd1c15647a.gif',
    'https://media.tenor.com/images/3a2e3354cbed5fc41c25bb6a75484d35/tenor.gif',
    'https://i.pinimg.com/originals/ba/0a/e7/ba0ae77e320cab483c86cdfbfc07d385.gif',
    'https://media0.giphy.com/media/NQK5mbOyUBPFK/200.gif',
    'https://i.kym-cdn.com/photos/images/newsfeed/001/021/949/a40.gif'
  ]),
  singleFileComponent: (props: { record: TestFileRecord }) => {
    return <SingleFileComponent {...props}
      previewUrl={props.record.src}
      downloadUrl={props.record.src}
      mimeType={props.record.mimeType}
      title={props.record.title}
      filename={props.record.title}
      text={[{ label: 'Text Label', value: 'Example Value' }, { label: 'Text Label2', value: 'Example Value2' }]}
      editFields={[]} />
  }
  ,
  loading: false
}

function generateTestRecordsFromSrcs(srcs: string[]): TestFileRecord[] {
  return srcs.map((src, index) => ({ src, title: `GIF ${index + 1}`, mimeType: 'image/gif' }))
}