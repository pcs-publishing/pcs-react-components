import { formatDistance } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Transition, Image, Icon } from 'semantic-ui-react'
import { PushNotification } from '../../../definitions'
import styled from '../../../theme-styled'

interface SinglePushNotificationProps {
  notification: PushNotification
  onMarkNotificationAsRead: (notificationId: string) => Promise<void>
  onClose: (notificationId: string) => void
}

const NotificationContainer = styled.div`
  background-color: ${(props) => props.theme.pushNotification.background};
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.pushNotification.border};
  margin: 10px 0px 10px 0px;
  padding: 10px;
  width: 100%;
  color: ${(props) => props.theme.pushNotification.text};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`

const TimeContainer = styled.div``

const MessageContainer = styled.div`
  margin-top: 10px;
`
const FromContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const TitleContainer = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 5px;
`

const ButtonContainer = styled.div`
  margin-top: 5px;
  padding-top: 3px;
  display: flex;
  justify-content: center;
`

const StyledButton = styled(Button)`
  background: none !important;
  color: ${(props) => props.theme.pushNotification.text} !important;
  border: 1px solid ${(props) => props.theme.pushNotification.border} !important;
`

const getDateDifference = (createdAt: string | Date): string => {
  return formatDistance(new Date(), new Date(createdAt))
}

const SinglePushNotification = ({
  notification,
  onMarkNotificationAsRead,
  onClose
}: SinglePushNotificationProps) => {
  const { title, from, createdAt, _id, message, avatarUrl } = notification
  const [visible, setVisible] = useState(false)
  const [initial, setInitial] = useState(false)
  const [timeAgo, setTimeAgo] = useState<string>(getDateDifference(createdAt))
  const duration = 500
  const intervalUpdateMilliSeconds = 30000

  const onUpdateTime = useCallback(() => {
    setTimeAgo(getDateDifference(createdAt))
  }, [setTimeAgo, getDateDifference])

  useEffect(() => {
    if (!visible && !initial) {
      setVisible(true)
      setInitial(true)
    }

    const intervalId = setInterval(
      () => onUpdateTime(),
      intervalUpdateMilliSeconds
    )

    return () => clearInterval(intervalId)
  }, [
    visible,
    setVisible,
    initial,
    setInitial,
    intervalUpdateMilliSeconds,
    onUpdateTime
  ])

  const onMarkAsRead = useCallback(() => {
    setVisible(false)
    setTimeout(async () => {
      await onMarkNotificationAsRead(_id)
    }, duration)
  }, [onMarkNotificationAsRead, setVisible, _id, duration])

  const onCloseNotification = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      onClose(_id)
    }, duration)
  }, [setVisible, duration, onClose, _id])

  return (
    <Transition visible={visible} animation="scale" duration={duration}>
      <NotificationContainer onMouseEnter={() => onUpdateTime()}>
        <TopContainer>
          <ImageContainer>
            {avatarUrl ? (
              <Image size="mini" src={avatarUrl} avatar />
            ) : (
              <Icon name="warning circle" />
            )}
          </ImageContainer>
          <TimeContainer>{timeAgo}</TimeContainer>
        </TopContainer>
        <MessageContainer>
          <FromContainer>
            New message {from ? `from ${from}` : ''}
          </FromContainer>
          <TitleContainer>{title}</TitleContainer>
          {message}
        </MessageContainer>
        <ButtonContainer>
          <Button.Group>
            <StyledButton onClick={() => onMarkAsRead()} animated="fade">
              <Button.Content visible>Mark as read</Button.Content>
              <Button.Content hidden>
                <Icon name="check" />
              </Button.Content>
            </StyledButton>
            <Button.Or />
            <StyledButton animated="fade" onClick={() => onCloseNotification()}>
              <Button.Content visible>Close</Button.Content>
              <Button.Content hidden>
                <Icon name="close" />
              </Button.Content>
            </StyledButton>
          </Button.Group>
        </ButtonContainer>
      </NotificationContainer>
    </Transition>
  )
}

export default SinglePushNotification
