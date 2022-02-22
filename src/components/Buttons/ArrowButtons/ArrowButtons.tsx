import React, { useEffect } from 'react'
import useCallOnKeyUp from '../../../hooks/useCallOnKeyUp'
import useIsKeyDown from '../../../hooks/useIsKeyDown'
import styled from '../../../theme-styled'
import Button from '../../Semantic-Themed/Button'
import { ButtonProps } from 'semantic-ui-react'

const ButtonContainer = styled.div`
  width: 100px;
  margin-bottom: 8px;
`

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2px;
`

const ArrowButton = styled(Button)`
`

export interface ArrowButtonsProps {
  onUp: () => void
  onDown: () => void
  onLeft: () => void
  onRight: () => void
  size?: ButtonProps['size']
  className?: string
  inverted?: boolean
}

const KEY_CODES = {
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown'
}

const ArrowButtons = (props: ArrowButtonsProps) => {
  const { onUp, onDown, onLeft, onRight } = props

  const arrowLeftIsDown = useIsKeyDown(KEY_CODES.LEFT)
  const arrowRightIsDown = useIsKeyDown(KEY_CODES.RIGHT)
  const arrowUpIsDown = useIsKeyDown(KEY_CODES.UP)
  const arrowDownIsDown = useIsKeyDown(KEY_CODES.DOWN)

  useEffect(disableDefaultArrowKeyBehavior, [])
  useCallOnKeyUp(KEY_CODES.UP, onUp)
  useCallOnKeyUp(KEY_CODES.LEFT, onLeft)
  useCallOnKeyUp(KEY_CODES.RIGHT, onRight)
  useCallOnKeyUp(KEY_CODES.DOWN, onDown)

  const commonButtonProps = {
    compact: true,
    size: props.size || 'large'
  }

  return <ButtonContainer className={props.className}>
    <ButtonRow>
      <ArrowButton inverted={props.inverted} icon="arrow up" primary={arrowUpIsDown} basic={!arrowUpIsDown} onClick={onUp} {...commonButtonProps} />
    </ButtonRow >
    <ButtonRow>
      <ArrowButton inverted={props.inverted} icon="arrow left" primary={arrowLeftIsDown} basic={!arrowLeftIsDown} onClick={onLeft} {...commonButtonProps} />
      <ArrowButton inverted={props.inverted} icon="arrow down" primary={arrowDownIsDown} basic={!arrowDownIsDown} onClick={onDown} {...commonButtonProps} />
      <ArrowButton inverted={props.inverted} icon="arrow right" primary={arrowRightIsDown} basic={!arrowRightIsDown} onClick={onRight} {...commonButtonProps} />
    </ButtonRow>
  </ButtonContainer >
}

function disableDefaultArrowKeyBehavior() {
  document.addEventListener('keydown', preventArrowKeyEventDefault)
  return () => {
    document.removeEventListener('keydown', preventArrowKeyEventDefault)
  }
}

function preventArrowKeyEventDefault(e: KeyboardEvent) {
  const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
  if (arrowKeys.includes(e.key)) {
    e.preventDefault()
  }
}

export default ArrowButtons
