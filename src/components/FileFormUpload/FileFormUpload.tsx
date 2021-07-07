import React from 'react'
import { DropdownItemProps, Form } from 'semantic-ui-react'
import styled from '../../theme-styled'
import Uploader from '../Uploader'
import { UploaderProps } from '../Uploader/Uploader'
import ImageHolder from './components/ImageHolder'
import _ from 'lodash'

export interface FileFormDefinition {
  type: 'dropdown' | 'input' | 'textarea'
  label: string
  dataName?: string
  options?: DropdownItemProps[]
}

export interface FileData {
  file: File
  data: { [key: string]: any }
}

export interface FileUploadProps extends UploaderProps {
  label: string
  fileData: FileData[]
  fileFormDefinitions?: FileFormDefinition[]
  onDelete?: (index: number, file: File) => void
  onChangeForm?: (index: number, key: string, value: any) => void
  maxImageHeight?: number
  maxImageWidth?: number
  labelControl?: JSX.Element
}

const FileUploadContainer = styled.div``

const FileUploadListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FileUpload = ({
  onDrop,
  uploadType,
  maxFileSize,
  multiple,
  acceptMimeTypes,
  border,
  className,
  size,
  width,
  label,
  fileData,
  fileFormDefinitions,
  onDelete,
  onChangeForm,
  maxImageWidth,
  maxImageHeight,
  labelControl: LabelControl
}: FileUploadProps) => {
  return (
    <FileUploadContainer>
      <Form.Field>
        <label>{label}</label>
        {LabelControl && LabelControl}
      </Form.Field>
      <Uploader
        onDrop={onDrop}
        uploadType={uploadType}
        multiple={multiple}
        maxFileSize={maxFileSize}
        acceptMimeTypes={acceptMimeTypes}
        border={border}
        className={className}
        size={size}
        width={width}
      />
      <FileUploadListContainer>
        {fileData.map((fileData, i) => (
          <ImageHolder
            fileData={fileData}
            fileFormDefinitions={fileFormDefinitions}
            onDelete={onDelete ? () => onDelete(i, fileData.file) : undefined}
            onChangeForm={
              onChangeForm
                ? (key, value) => onChangeForm(i, key, value)
                : undefined
            }
            maxImageWidth={maxImageWidth}
            maxImageHeight={maxImageHeight}
          />
        ))}
      </FileUploadListContainer>
    </FileUploadContainer>
  )
}

export default FileUpload
