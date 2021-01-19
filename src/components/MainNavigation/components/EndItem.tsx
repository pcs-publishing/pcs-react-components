import React from 'react'
import { AdditionalItemProps, Orientation } from '../../NavigationBar'
import { MainNavigationUser } from '../'
import Version from './Version'
import styled from '../../../theme-styled'
import ProfilePicture from '../../ProfilePicture'

interface EndItemProps extends AdditionalItemProps {
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

const StyledVersion = styled(Version)`
  padding: 10px !important;
  font-size: 0.8em;
`

const EndItem = (props: EndItemProps) => {
  const horizontal = props.orientation === 'horizontal'
  const showUser = props.user && horizontal


  return <Container $orientation={props.orientation}>
    <StyledVersion {...props} />
    {showUser ? <ProfilePicture {...(props.user as MainNavigationUser)} size={40} onClick={props.onUserClick} /> : null}

  </Container>
}

export default EndItem