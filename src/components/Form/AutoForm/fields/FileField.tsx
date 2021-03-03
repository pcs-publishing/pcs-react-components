import React, { useCallback, useRef, useState } from 'react'
import { Form } from 'semantic-ui-react'
import { FieldProps } from '../definitions'
import {} from '../../../../util/file'
import ViewFileWindow, { FileRecord } from '../../../ViewFileWindow'
import styled from '../../../../theme-styled'

const FileFieldContainer = styled.div<{ isFile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.isFile ? 'center' : 'space-between')};
`

const FileField = (props: FieldProps) => {
  const { onChange, field, value, allValues } = props

  const [open, setOpen] = useState(false)

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file =
        e.target.files && e.target.files.length > 0
          ? e.target.files[0]
          : undefined
      onChange(field.key, file)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const isFileRecordInstance = useCallback(() => {
    if (!value) return false
    const valueAsAny = value as any
    if ('url' in valueAsAny) {
      return true
    }
    return false
  }, [value])

  const isFileRecord = isFileRecordInstance()

  const accept = field.allowedMimeTypes?.reduce(
    (prevValue, curValue) => `${prevValue},${curValue}`
  )

  const isFile = !!value && !isFileRecord

  const valueAsFile = value as File

  return (
    <FileFieldContainer isFile={isFile}>
      <Form.Button
        autoFocus={!!field.autoFocus}
        label={field.label}
        onClick={() => fileInputRef.current?.click()}
        disabled={!!field.disabled}
        error={error}
        primary
        type="button"
      >
        {value ? (isFileRecord ? 'Update File' : 'File Chosen') : 'Choose File'}
      </Form.Button>
      {isFileRecord ? (
        <Form.Button type="button" onClick={() => setOpen(true)}>
          Preview
        </Form.Button>
      ) : isFile ? (
        <strong>{valueAsFile.name}</strong>
      ) : null}
      {isFileRecord && open ? (
        <ViewFileWindow
          file={value as FileRecord}
          onClose={() => setOpen(false)}
        />
      ) : null}
      <input
        accept={accept}
        ref={fileInputRef}
        type="file"
        hidden
        onChange={onFileChange}
      />
    </FileFieldContainer>
  )
}

export default FileField
