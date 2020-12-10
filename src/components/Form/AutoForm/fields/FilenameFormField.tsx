import React, { useCallback } from 'react'
import { FieldProps } from '../definitions'
import FilenameField from '../../FilenameField';

const FilenameFormField = (props: FieldProps) => {
  const { field, onChange, value, allValues } = props

  const onFilenameChange = useCallback(
    (value: string) => {
      onChange(field.key, value)
    },
    [onChange, field]
  )

  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <FilenameField
      label={field.label}
      value={props.value as string}
      onChange={onFilenameChange}
      inputProps={{
        error: error ? true : false
      }}
    />
  )
}

export default FilenameFormField
