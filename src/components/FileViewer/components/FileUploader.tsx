import React from 'react'
import Uploader from '../../Uploader'

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>
  acceptedMimeTypes: string[]
  typeOfFile: string
  maxFileSize?: number
  className?: string
}

const FileUploader = (props: FileUploadProps) => {
  return (
    <Uploader
      className={props.className}
      size={13}
      multiple={true}
      maxFileSize={props.maxFileSize ?? 50_000_000} // defaults to 50mb
      uploadType={props.typeOfFile}
      onDrop={props.onUpload}
      acceptMimeTypes={props.acceptedMimeTypes}
    />
  )
}

export default FileUploader
