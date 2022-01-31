import React from 'react'
import { AdditionalItemProps, Orientation } from '../../NavigationBar'
import { MainNavigationUser } from '..'
import Version from './Version'
import styled from '../../../theme-styled'
import ProfilePicture from '../../ProfilePicture'

interface LastItemProps extends AdditionalItemProps {
  user?: MainNavigationUser
  onUserClick?: () => void
  version: string
  compact?: boolean
}

const Container = styled.div < { $orientation: Orientation }>`
  display: flex;
  flex-flow: ${props => props.$orientation === 'vertical' ? 'row wrap' : 'row-reverse nowrap'};
  align-items: center;
  flex-grow: 1;

  ${props => {
    if (props.$orientation !== 'vertical') {
      return ''
    }

    return 'width: 100%;'
  }}
`

const LastItem: React.FunctionComponent<LastItemProps> = (props) => {
  const horizontal = props.orientation === 'horizontal'
  const showUser = props.user && horizontal


  return <Container $orientation={props.orientation}>
    {props.children}
    {!props.compact ? <Version {...props} /> : null}
    {showUser ? <ProfilePicture {...(props.user as MainNavigationUser)} size={40} onClick={props.onUserClick} /> : null}
  </Container>
}

export default LastItem
