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
}

const Container = styled.div < { $orientation: Orientation }>`
  flex-grow: 1;
  display: flex;
  flex-direction: ${props => props.$orientation === 'vertical' ? 'column' : 'row-reverse'};
  align-items: center;
`


const LastItem: React.FunctionComponent<LastItemProps> = (props) => {
  const horizontal = props.orientation === 'horizontal'
  const showUser = props.user && horizontal


  return <Container $orientation={props.orientation}>
    {props.children}
    <Version {...props} />
    {showUser ? <ProfilePicture {...(props.user as MainNavigationUser)} size={40} onClick={props.onUserClick} /> : null}

  </Container>
}

export default LastItem