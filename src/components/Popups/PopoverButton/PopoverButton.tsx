import React, { useState, FunctionComponent } from 'react'
import styled from '../../../theme-styled'
import Box from '../../Styled/Box'
import Button from '../../Buttons/Button'
import { ButtonProps } from 'semantic-ui-react'
import { omit } from 'lodash'

const Popover = styled(Box) <{ $popoverWidth?: number }>`
  position: absolute;
  width: ${props => props.$popoverWidth || 250}px;
  z-index: 2;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
`

export interface PopoverButtonProps extends ButtonProps {
  popover: FunctionComponent<{ onClose: () => void }>
  popoverWidth?: number
}

const PopoverButton = (props: PopoverButtonProps) => {
  const [open, setOpen] = useState(false)
  const PopoverComponent = props.popover
  return <>
    <Button {...omit(props, ['popover', 'popoverWidth'])} onClick={() => setOpen(true)} />

    {open && (<Popover $popoverWidth={props.popoverWidth}>
      <PopoverComponent onClose={() => setOpen(false)} />
    </Popover>)}
  </>
}

export default PopoverButton
