import React, { useCallback } from 'react'
import { FieldProps } from '../definitions'
import Dropdown from '../../../Dropdown'

const DropdownField = (props: FieldProps) => {
  const { onChange, field, defaultValue, value, allValues } = props
  const { options, label, autoFocus, multiple } = field
  const onValueChange = useCallback(
    (value: any) => {
      onChange(field.key, value)
    },
    [onChange, field]
  )
  const error = field.error ? field.error(value, allValues ?? {}) : undefined

  return (
    <Dropdown
      label={label}
      onChange={onValueChange}
      value={undefined}
      options={options}
      dropdownProps={{
        autoFocus: !!autoFocus,
        placeholder: label,
        fluid: true,
        labeled: true,
        defaultValue: defaultValue as string | string[] | number,
        clearable: true,
        error: error ? true : false,
        multiple: multiple
      }}
    />
  )
}

export default DropdownField
