import React, { useState, ChangeEvent } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from '../../theme-styled'

export interface EditableLabelProps {
  value: string
  onChange?: (value: string) => void
}

const InputContainer = styled.div``

const TextContainer = styled.div`
  padding: 10px;
  padding-left: 15px;
  display: inline-block;
`

const EditIcon = styled(Icon)`
  padding-left: 10px;
`

const EditableLabel = (props: EditableLabelProps) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(props.value)
  const [showIcon, setShowIcon] = useState(false)

  const onBlur = () => {
    if (props.onChange) props.onChange(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <InputContainer className="ui input">
        <input
          type="text"
          autoFocus
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setShowIcon(false)
            setValue(event.target.value)
          }}
          onBlur={onBlur}
        />
      </InputContainer>
    )
  }

  return (
    <TextContainer
      onClick={() => {
        setEditing(true)
      }}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <span>{value}</span>
      {showIcon ? <EditIcon name="edit outline" /> : null}
    </TextContainer>
  )
}

export default EditableLabel
