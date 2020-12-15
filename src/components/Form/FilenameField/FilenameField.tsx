import React, { useState, useCallback } from 'react'
import { Form, Input, InputProps } from 'semantic-ui-react'
import { getFilenameInfo } from '../../../util/filename'

export interface FilenameFieldProps {
  value: string
  label?: string
  inputProps?: InputProps
  onChange: (value: string) => void
}

const FilenameField = (props: FilenameFieldProps) => {
  const { label, inputProps, onChange } = props

  const info = getFilenameInfo(props.value)
  const [currentName, setName] = useState(info.name)
  const [extensionValue, setExtension] = useState(info.extension || '')

  const onFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value || ''
      setName(newValue)
      onChange(newValue + extensionValue)

      if (!extensionValue) {
        const info = getFilenameInfo(currentName)
        if (info.name && info.extension) {
          setName(info.name)
          setExtension(info.extension)
        }
      }
    },
    [setName, onChange, extensionValue, currentName]
  )

  return (
    <Form.Field>
      {label ? <label>{label}</label> : null}
      <Input
        placeholder="Enter filename..."
        {...(inputProps || {})}
        label={extensionValue}
        labelPosition="right"
        value={currentName}
        onChange={onFieldChange}
      />
    </Form.Field>
  )
}

export default FilenameField
