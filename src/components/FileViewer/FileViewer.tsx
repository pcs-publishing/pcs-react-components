import React, { useState, useCallback } from 'react'
import FileViewerToolbar from './components/FileViewerToolbar'
import FileViewerGrid from './components/FileViewerGrid'
import { FileViewerProps } from './definitions'
import ViewFileWindow, { FileRecord } from '../ViewFileWindow'
import Confirm from '../Popups/Confirm'

const FileViewer = <T extends any>(props: FileViewerProps<T>) => {
  const [fileToView, setFileToView] = useState<FileRecord | undefined>()
  const [recordToDelete, setRecordToDelete] = useState<T | undefined>()

  const { onDeleteClick, ...otherProps } = props

  const handleView = useCallback(
    (url: string, name: string, mimeType: string, textContent?: string) => {
      setFileToView({
        url,
        name,
        mimeType,
        textContent
      })
    },
    [setFileToView]
  )
  const clearFileToView = useCallback(() => {
    setFileToView(undefined)
  }, [setFileToView])

  const handleDelete = useCallback(
    (record: T) => {
      setRecordToDelete(record)
    },
    [setRecordToDelete]
  )

  const clearRecordToDelete = useCallback(() => {
    setRecordToDelete(undefined)
  }, [setRecordToDelete])

  const onConfirmDeleteClick = useCallback(() => {
    if (recordToDelete && onDeleteClick) onDeleteClick(recordToDelete)
  }, [onDeleteClick, recordToDelete])

  return (
    <>
      <Confirm
        title="Are you sure?"
        message={`Are you sure you want to delete this ${otherProps.typeOfFile}?`}
        open={!!recordToDelete}
        close={clearRecordToDelete}
        confirmButtonText="Delete"
        confirmButtonColor="red"
        onConfirmCallback={onConfirmDeleteClick}
      />
      <ViewFileWindow file={fileToView} onClose={clearFileToView} />
      <FileViewerToolbar {...otherProps} />
      <FileViewerGrid
        {...otherProps}
        onView={handleView}
        onDeleteClick={handleDelete}
      />
    </>
  )
}

export default FileViewer
