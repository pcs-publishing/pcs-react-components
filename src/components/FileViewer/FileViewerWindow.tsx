import React from 'react'
import styled from '../../theme-styled'
import Modal, { ModalContent, ModalHeader } from '../Semantic-Themed/Modal'
import { FileViewerProps } from './definitions'
import FileViewer from './FileViewer'

const StyledModalContent = styled(ModalContent)`
  padding: 0 !important;
`

export interface FileViewerWindowProps<T> extends FileViewerProps<T> {
  title: string
  open: boolean
  close: () => void
}

const FileViewerWindow = <T extends any>(props: FileViewerWindowProps<T>) => {
  const { title, open, close, ...otherProps } = props
  return (
    <Modal open={open} onClose={close} size="large" closeIcon centered={false}>
      <ModalHeader>{title}</ModalHeader>
      <ModalContent>
        <FileViewer {...otherProps} />
      </ModalContent>
    </Modal>
  )
}

export default FileViewerWindow
