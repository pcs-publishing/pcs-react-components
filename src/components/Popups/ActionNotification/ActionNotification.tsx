import React, { useCallback, useState, useEffect } from 'react'
import {
  SemanticICONS,
  TransitionablePortal,
  Icon,
  Segment,
  SemanticCOLORS,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { isFunction } from 'lodash'
import { DisplayNotificationOptions } from '../../../definitions'


const MessageSegment = styled(Segment)`
  display: inline-block;
`

const Container = styled.div`
  width: 100%;
  position: fixed !important;
  margin: 0 auto;
  top: 0 !important;
  z-index: 1000 !important;
  padding: 10px;
  display: inline-block;
  text-align: center;
`

type MessagePosition = 'left' | 'right' | 'center'

export interface ActionNotificationProps {
  displayForMs?: number
  message: string | React.ReactElement
  displaying: DisplayNotificationOptions
  show: boolean
  position?: MessagePosition
  close?: () => void
}

function getIconForDisplaying(
  displaying: DisplayNotificationOptions
): SemanticICONS {
  switch (displaying) {
    case 'success':
      return 'check circle'
    case 'error':
      return 'cancel'
    case 'warning':
      return 'warning circle'
    case 'message':
      return 'info circle'
  }
}

function getColorForDisplaying(
  displaying: DisplayNotificationOptions
): SemanticCOLORS {
  switch (displaying) {
    case 'success':
      return 'green'
    case 'error':
      return 'red'
    case 'warning':
      return 'yellow'
    case 'message':
      return 'blue'
  }
}

const ActionNotification = (props: ActionNotificationProps) => {
  const { displayForMs, message, displaying, show, close } = props
  const color: SemanticCOLORS = getColorForDisplaying(displaying)
  const icon: SemanticICONS = getIconForDisplaying(displaying)
  const [showMessage, setShowMessage] = useState<boolean>(show)
  const [displayMessage, setDisplayMessage] = useState<
    string | React.ReactElement
  >(message)
  useEffect(() => {
    setShowMessage(show)
    setDisplayMessage(message)
  }, [show, message])

  const closeMessage = useCallback(() => {
    const timeoutLength = displayForMs || 2000 // 2 seconds default
    setTimeout(() => {
      setShowMessage(false)
      if (isFunction(close)) {
        close()
      }
      setDisplayMessage('')
    }, timeoutLength)
  }, [setShowMessage, setDisplayMessage, close, displayForMs])

  return (
    <TransitionablePortal
      open={showMessage}
      transition={{
        animation: 'fade up',
        duration: 400,
      }}
      // initiate the close message on show
      onOpen={() => closeMessage()}
    >
      <Container>
        <MessageSegment
          color={color}
          inverted
          floated={props.position !== 'center' ? props.position : undefined}
          raised
          size='large'
        >
          <Icon name={icon} />
          {displayMessage}
        </MessageSegment>
      </Container>
    </TransitionablePortal>
  )
}

export default ActionNotification
