import React, { useCallback } from 'react'
import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import { FieldProps } from '../definitions'

const StyledCheckbox = styled(Checkbox)`
  margin-top: 5px !important;
  margin-bottom: 10px !important;
`

const BooleanField = (props: FieldProps) => {
  const { onChange, field, value } = props
  const onCheckboxChange = useCallback(
    (_e: React.FormEvent<HTMLInputElement>, data: any) => {
      const value = data.checked
      onChange(field.key, value)
    },
    [onChange, field]
  )

  return (
    <StyledCheckbox
      toggle
      autoFocus={!!field.autoFocus}
      label={field.label}
      checked={value as boolean}
      onChange={onCheckboxChange}
    />
  )
}

export default BooleanField
