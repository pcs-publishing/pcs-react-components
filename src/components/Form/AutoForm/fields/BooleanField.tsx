import React, { useCallback } from 'react'
import { Checkbox, Container } from 'semantic-ui-react'
import styled from 'styled-components'
import { FieldProps } from '../definitions'

const StyledCheckbox = styled(Checkbox)`
  margin-top: 5px !important;
  margin-bottom: 10px !important;
`
const StyledContainer = styled(Container)`
  margin-block-end: 10px !important;
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
    <StyledContainer>
      <StyledCheckbox
        toggle
        autoFocus={!!field.autoFocus}
        label={field.label}
        checked={value as boolean}
        onChange={onCheckboxChange}
      />
    </StyledContainer>
  )
}

export default BooleanField
