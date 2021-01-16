import React, { FunctionComponent, useState } from 'react'
import NavigationBar, { NavigationBarProps, AdditionalItemProps } from './NavigationBar'
import styled from '../../theme-styled'
import SVGLogo from '../SVGLogo/SVGLogo'
import { NavigationItem } from '.'
import { Separator } from 'react-contexify'

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

export const WithLogo = (props: NavigationBarProps) => {
  const [location, setLocation] = useState(props.currentLocation)

  return <Container>
    <NavigationBar {...props} topItem={TopItem} items={items} orientation="vertical" currentLocation={location} onNavigate={(path => {
      setLocation(path)
      props.onNavigate(path)
    })} />
  </Container>
}

const LogoContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
`

const TopItem = (props: AdditionalItemProps) => {
  return <>
    <LogoContainer>
      <SVGLogo src="/indesign-cc.svg" size={170} />
    </LogoContainer>
    <Separator />
  </>

}

