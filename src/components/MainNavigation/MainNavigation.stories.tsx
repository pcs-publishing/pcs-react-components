import React from 'react'
import styled from '../../theme-styled'
import MainNavigation, { MainNavigationProps } from './MainNavigation'

export default {
  title: 'Menu/Main Navigation',
  component: MainNavigation,
  argTypes: {
    onNavigate: { action: 'navigate' },
    onUserClick: { action: 'userClick' }
  }
}

const Page = styled.div`
  height: 700px;
  width: 100%;
`

const Template = (props: MainNavigationProps) => {
  return <Page><MainNavigation {...props} /></Page>
}

const defaultProps = {
  logo: '/react-2.svg',
  version: '2.1.35',
  currentLocation: '/',
  orientation: 'vertical',
  items: [{
    title: 'Home',
    icon: 'home',
    path: '/'
  }, {
    title: 'Games',
    icon: 'gamepad',
    path: '/games'
  }, {
    title: 'Vaccinations',
    icon: 'microchip',
    path: '/vaccinations'
  }]
}

export const Vertical = Template.bind({})
Vertical.args = { ...defaultProps, orientation: 'vertical' }

export const Horizontal = Template.bind({})
Horizontal.args = { ...defaultProps, orientation: 'horizontal' }

export const VerticalWithUser = Template.bind({})
VerticalWithUser.args = {
  ...defaultProps,
  user: {
    firstname: 'Christopher',
    surname: 'Train',
    avatar: '/avatar.png'
  }
}

export const HorizontalWithUser = Template.bind({})
HorizontalWithUser.args = {
  ...defaultProps,
  orientation: 'horizontal',
  user: {
    firstname: 'Christopher',
    surname: 'Train',
    avatar: '/avatar.png'
  }
}
