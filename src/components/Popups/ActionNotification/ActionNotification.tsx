import React, { useCallback, useState, useEffect } from 'react'
import {
  SemanticICONS,
  Button,
  TransitionablePortal,
  Icon,
  Segment,
  SemanticCOLORS
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

const CloseButtonContainer = styled.div`
  width: 100%;
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
  persist?: boolean
}

const ANIMATION_LENGTH = 400

function getIconForDisplaying(
  displaying: DisplayNotificationOptions
): SemanticICONS {
  switch (displaying) {
    case 'success':
      return 'check circle'
    case 'error':
      return 'exclamation triangle'
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
  const { displayForMs, message, displaying, show, close, persist } = props
  const color: SemanticCOLORS = getColorForDisplaying(displaying)
  const icon: SemanticICONS = getIconForDisplaying(displaying)
  const [showMessage, setShowMessage] = useState<boolean>(show)
  const [displayMessage, setDisplayMessage] = useState<
    string | React.ReactElement
  >(message)
  const [hideTimeoutId, setHideTimeoutId] = useState<number | undefined>()

  useEffect(() => {
    setShowMessage(show)
    if (message) {
      setDisplayMessage(message)
    }
  }, [show, message])

  const closeMessage = useCallback(() => {
    const timeoutLength = displayForMs || 2000 // 2 seconds default
    if (persist) {
      return
    }

    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId)
    }

    const timeoutId = setTimeout(() => {
      setShowMessage(false)
      setTimeout(() => {
        if (!show) {
          setDisplayMessage('')
        }
      }, ANIMATION_LENGTH)
    }, timeoutLength)

    setHideTimeoutId(timeoutId)
  }, [setShowMessage, setDisplayMessage, close, displayForMs, persist])

  return (
    <>
      <TransitionablePortal
        open={showMessage}
        transition={{
          animation: 'fade up',
          duration: persist ? undefined : ANIMATION_LENGTH
        }}
        // initiate the close message on show
        onOpen={() => closeMessage()}
        onClose={() => {
          if (isFunction(close)) {
            close()
          }
        }}
      >
        <Container>
          <MessageSegment
            color={color}
            inverted
            floated={props.position !== 'center' ? props.position : undefined}
            raised
            size="large"
          >
            <Icon name={icon} />
            {displayMessage}
          </MessageSegment>
          {persist ? (
            <CloseButtonContainer>
              <Button content="Close" onClick={() => setShowMessage(false)} />
            </CloseButtonContainer>
          ) : null}
        </Container>
      </TransitionablePortal>
    </>
  )
}

export default ActionNotification
