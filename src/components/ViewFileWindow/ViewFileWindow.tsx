import React from 'react'
import ImageLightbox from '../Image/ImageLightbox'
import Alert from '../Popups/Alert'
import TextViewer from './components/TextViewer'
import { FileRecord } from '../../definitions'

export interface ViewFileWindowProps {
  file: FileRecord | undefined
  onClose: () => void
}

const ViewFileWindow = (props: ViewFileWindowProps) => {
  const { file, onClose } = props

  if (!file) {
    return null
  }

  if (isImage(file)) {
    return getImageViewer(file, onClose)
  }
  if (isTextDocument(file)) {
    return getTextViewer(file, onClose)
  }

  return (
    <Alert
      open={true}
      close={onClose}
      title={'Failed To Load File Preview'}
      message={`Failed to load preview for file ${file.name}`}
    />
  )
}

function getImageViewer(
  file: FileRecord,
  onClose: () => void
): React.ReactElement {
  return <ImageLightbox open={true} src={file.url} onClose={onClose} />
}

function getTextViewer(
  file: FileRecord,
  onClose: () => void
): React.ReactElement {
  return (
    <TextViewer
      onClose={onClose}
      name={file.name}
      textContent={file.textContent}
    />
  )
}

function isImage(file: FileRecord): boolean {
  return file.mimeType.startsWith('image/')
}

function isTextDocument(file: FileRecord): boolean {
  return !!file.textContent
}

export default ViewFileWindow
