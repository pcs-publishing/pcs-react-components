import React from 'react'
import { MainNavigationUser } from '.'
import NavigationBar, { AdditionalItemProps, NavigationItem, Orientation } from '../NavigationBar'
import StartItem from './components/StartItem'
import EndItem from './components/EndItem'


export interface MainNavigationProps {
  logo: string
  version: string
  currentLocation: string
  items: NavigationItem[]
  orientation: Orientation
  user?: MainNavigationUser
  onUserClick?: () => void
  onNavigate: (path: string) => void
}

const MainNavigation = (props: MainNavigationProps) => {
  return <NavigationBar
    items={props.items}
    currentLocation={props.currentLocation}
    onNavigate={props.onNavigate}
    orientation={props.orientation}
    initiallyCollapsed={false}
    startItem={(itemProps: AdditionalItemProps) => <StartItem {...itemProps} onLogoClick={() => props.onNavigate('/')} logo={props.logo} user={props.user} onUserClick={props.onUserClick} />}
    lastItem={(itemProps: AdditionalItemProps) => <EndItem {...itemProps} version={props.version} user={props.user} onUserClick={props.onUserClick} />}
  />
}

export default MainNavigation