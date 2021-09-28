import React, { useCallback, useRef } from 'react'
import Button from '../Button'
import styled from '../../../theme-styled'

const InvisibleInput = styled.input`
  display: none;
`

const StyledButton = styled(Button)`
  margin-bottom: 10px !important;
  margin-right: 3px !important;
  margin-left: 3px !important;
`

export interface UploadButtonProps {
  onChangeFile: (file: File | null) => Promise<void>
}

const UploadButton = (props: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onOpenFileUpload = useCallback(() => {
    inputRef.current?.click()
  }, [inputRef])

  return (
    <>
      <StyledButton primary icon="upload" onClick={onOpenFileUpload} />
      <InvisibleInput
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const file =
            e.target.files && e.target.files[0] ? e.target.files[0] : null
          props.onChangeFile(file)
        }}
      />
    </>
  )
}

export default UploadButton
