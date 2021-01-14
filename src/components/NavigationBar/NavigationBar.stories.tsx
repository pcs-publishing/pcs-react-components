import React, { useState } from 'react'
import NavigationBar, { NavigationBarProps } from './NavigationBar'
import styled from '../../theme-styled'

const Container = styled.div`
  width: 100%;
  height: 600px;
`

export default {
  title: 'Menu/NavigationBar',
  component: NavigationBar,
  argTypes: { onNavigate: { action: 'navigate' } }
}

const Template = (props: NavigationBarProps) => {
  const [location, setLocation] = useState(props.currentLocation)
  return <Container>
    <NavigationBar {...props} currentLocation={location} onNavigate={(path => {
      setLocation(path)
      props.onNavigate(path)
    })} />
  </Container>
}

export const Example = Template.bind({})

Example.args = {
  currentLocation: '/',
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
  }, {
    title: 'Tasks',
    icon: 'tasks',
    path: '/tasks'
  }, {
    title: 'Calendar',
    icon: 'calendar alternate outline',
    path: '/calendar'
  }],
  initiallyCollapsed: false
}