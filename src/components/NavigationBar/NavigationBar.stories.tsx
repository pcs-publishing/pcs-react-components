import React, { useState } from 'react'
import NavigationBar, { NavigationBarProps } from './NavigationBar'
import styled from '../../theme-styled'
import SVGLogo from '../SVGLogo/SVGLogo'
import { AdditionalItemProps, NavigationItem } from '.'
import Version from '../Version'

const Container = styled.div`
  width: 100%;
  height: 600px;
`

const items: NavigationItem[] = [{
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
}]

export default {
  title: 'Menu/Navigation Bar',
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

export const Horizontal = Template.bind({})

Horizontal.args = {
  orientation: 'horizontal',
  currentLocation: '/',
  items,
  initiallyCollapsed: false
}

export const Vertical = Template.bind({})

Vertical.args = {
  orientation: 'vertical',
  currentLocation: '/',
  items,
  initiallyCollapsed: false
}

export const WithStartItem = (props: NavigationBarProps) => {
  const [location, setLocation] = useState(props.currentLocation)

  return <Container>
    <NavigationBar {...props} startItem={LogoItem} items={items} orientation="vertical" currentLocation={location} onNavigate={(path => {
      setLocation(path)
      props.onNavigate(path)
    })} />
  </Container>
}


export const WithLastItem = (props: NavigationBarProps) => {
  const [location, setLocation] = useState(props.currentLocation)

  return <Container>
    <NavigationBar {...props} lastItem={VersionItem} items={items} orientation="vertical" currentLocation={location} onNavigate={(path => {
      setLocation(path)
      props.onNavigate(path)
    })} />
  </Container>
}

const LogoContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
`

const LogoItem = (props: AdditionalItemProps) => {
  return <LogoContainer>
    <SVGLogo src="/redis.svg" size={170} />
  </LogoContainer>
}


const VersionItem = (props: AdditionalItemProps) => {
  return <Version version="1.0.1" />
}