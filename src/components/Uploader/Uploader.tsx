import React, { useState, useCallback } from 'react'
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone'
import styled from '../../theme-styled'
import UploadGrid from './components/UploadGrid'
import { isEmpty } from 'lodash'
import { FileUpload, FileUploadStatus } from './definitions'




export interface UploaderProps {
  onDrop: (file: File) => Promise<void>
  uploadType: string
  acceptMimeTypes?: string | string[]
  multiple?: boolean
  size?: number
  maxFileSize?: number
  className?: string
  width?: number
  border?: { bottom?: string; top?: string; left?: string; right?: string }
}

const UploadContainer = styled.div<{
  size: number
  width?: number
  border?: { bottom?: string; top?: string; left?: string; right?: string }
}>`
  width: ${(props) => props.width ?? 100}%;
  padding: ${(props) => Math.round(props.size / 2)}px;
  text-align: center;
  border: ${(props) => (props.border ? '' : '2px dotted #ccc')};
  border-bottom: ${(props) => props.border?.bottom ?? ''};
  border-top: ${(props) => props.border?.top ?? ''};
  border-left: ${(props) => props.border?.left ?? ''};
  border-right: ${(props) => props.border?.right ?? ''};
  user-select: none;
  border-radius: 3px;
  cursor: pointer;

  ${props => props.theme.backgrounds.offset}
`

const UploadInput = styled.input``

const UploadMessage = styled.p``

const Uploader = (props: UploaderProps) => {
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([])
  const maxFileSize = props.maxFileSize ?? 5 * 1024 * 1024 // default 5mb

  const options: DropzoneOptions = {
    onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setFileUploads((currentUploads: FileUpload[]) => {
        const rejectedFileUploads = formatFilesToFileUploads(
          rejectedFiles.map(rf => rf.file),
          FileUploadStatus.REJECTED,
          `This file can not be uploaded`
        )

        const acceptedFileUploads: FileUpload[] = acceptedFiles.map((file) => {
          const promise = props.onDrop(file)

          promise
            .then(() => {
              updateFileUploadState(
                setFileUploads,
                file.name,
                FileUploadStatus.UPLOADED
              )
            })
            .catch((err) => {
              updateFileUploadState(
                setFileUploads,
                file.name,
                FileUploadStatus.FAILED,
                err.message
              )
            })

          return {
            name: file.name,
            file: file,
            status: FileUploadStatus.ACCEPTED
          }
        })

        return currentUploads
          .concat(acceptedFileUploads)
          .concat(rejectedFileUploads)
      })
    },
    accept: isEmpty(props.acceptMimeTypes) ? undefined : props.acceptMimeTypes,
    multiple: props.multiple ?? true,
    maxSize: maxFileSize
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(options)

  const onFileUploadClose = useCallback(
    (fileUpload: FileUpload) => {
      removeFileUpload(setFileUploads, fileUpload)
    },
    [setFileUploads]
  )

  return (
    <>
      <UploadContainer
        className={props.className}
        size={props.size || 80}
        width={props.width}
        border={props.border}
        {...getRootProps()}
      >
        <UploadInput {...getInputProps()} />
        <UploadMessage>
          {isDragActive
            ? `Drop your ${props.uploadType} here...`
            : `Drag and drop your ${props.uploadType} here, or click to select the ${props.uploadType} to upload.`}
        </UploadMessage>
      </UploadContainer>
      <UploadGrid uploads={fileUploads} onUploadClose={onFileUploadClose} />
    </>
  )
}

function formatFilesToFileUploads(
  files: File[],
  status: FileUploadStatus,
  message?: string
): FileUpload[] {
  return files.map((file) => ({ name: file.name, file, status, message }))
}

function updateFileUploadState(
  setFileUploads: React.Dispatch<React.SetStateAction<FileUpload[]>>,
  name: string,
  status: FileUploadStatus,
  message?: string
) {
  setFileUploads((files: FileUpload[]) => {
    const matchingFileIndex = files.findIndex((f) => f.name === name)
    if (matchingFileIndex < 0) return files

    const matchingFile = files[matchingFileIndex]

    files[matchingFileIndex] = { ...matchingFile, status, message }

    return [...files]
  })
}

/**
 * Remove the passed files upload from the file uploads state
 *
 * @param setFileUploads The setter for file upload
 * @param fileUpload The file upload to remove
 */
function removeFileUpload(
  setFileUploads: React.Dispatch<React.SetStateAction<FileUpload[]>>,
  fileUpload: FileUpload
) {
  setFileUploads((files: FileUpload[]) => {
    return files.filter((file) => file.name !== fileUpload.name)
  })
}

export default Uploader
