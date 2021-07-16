import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from 'date-fns'
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
  background-color: white;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin: 10px 0px 10px 0px;
  padding: 10px;
  width: 100%;
  color: black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Span = styled.span`
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 3px;
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
  color: black !important;
  border: 1px solid black !important;
`

const getDateDifference = (createdAt: string | Date): string => {
  const secondsDifference = differenceInSeconds(new Date(), new Date(createdAt))
  if (secondsDifference < 60) return `${secondsDifference}s ago`
  const minutesDifference = differenceInMinutes(new Date(), new Date(createdAt))
  if (minutesDifference < 60) return `${minutesDifference}m ago`
  const hoursDifference = differenceInHours(new Date(), new Date(createdAt))
  const leftOverMinutesPercentage =
    1 - Math.round((hoursDifference * 60) / minutesDifference)
  const leftOverMinutes = Math.round(60 * leftOverMinutesPercentage)
  if (hoursDifference < 24) return `${hoursDifference}h ${leftOverMinutes}m`
  return 'Unknown difference'
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
          <FromContainer>New message from {from}</FromContainer>
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
