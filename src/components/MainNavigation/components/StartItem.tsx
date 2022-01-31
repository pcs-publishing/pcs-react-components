import React from 'react'
import { AdditionalItemProps } from '../../NavigationBar'
import SVGLogo from '../../SVGLogo'
import { Divider } from 'semantic-ui-react'
import styled from '../../../theme-styled'
import ProfilePicture from '../../ProfilePicture'
import { MainNavigationUser } from '..'

interface StartItemProps extends AdditionalItemProps {
  logo: string
  onLogoClick: () => void
  onUserClick?: () => void
  compact?: boolean
  user?: MainNavigationUser
}

const Logo = styled(SVGLogo)`
  margin: 0 auto;
`

const CentralProfilePicture = styled(ProfilePicture)`
  margin: 0 auto;
  min-height: ${props => props.size}px;
  min-width: ${props => props.size}px;
`

const HorizontalDivider = styled.div`
  height: 100%;
  margin: 5px 10px;
  width: 1px;
  color: 'white';
`

const StartItem: React.FunctionComponent<StartItemProps> = (props) => {
  const horizontal = props.orientation === 'horizontal'
  const smaller = props.collapsed || horizontal
  const size = smaller ? 40 : 150
  const Splitter = horizontal ? <HorizontalDivider /> : <Divider />
  const showUser = props.user && props.orientation === 'vertical'
  const userSize = Math.round(size / 1.2)

  return <>
    <Logo src={props.logo} size={size} onClick={props.onLogoClick} />
    {Splitter}
    {showUser ? <>
      <CentralProfilePicture size={userSize} showName={!smaller} {...props.user as MainNavigationUser} onClick={props.onUserClick} />
      {Splitter}
    </>
      : null}
    {props.children}
  </>
}

export default StartItem
