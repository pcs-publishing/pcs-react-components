import React from 'react'
import { MainNavigationUser } from '.'
import NavigationBar, { AdditionalItem, AdditionalItemProps, NavigationItem, Orientation } from '../NavigationBar'
import StartItem from './components/StartItem'
import LastItem from './components/LastItem'

export interface MainNavigationProps {
  logo: string
  version: string
  currentLocation: string
  items: NavigationItem[]
  orientation: Orientation
  user?: MainNavigationUser
  onUserClick?: () => void
  onNavigate: (path: string) => void
  startItem?: AdditionalItem
  lastItem?: AdditionalItem
}

const MainNavigation = (props: MainNavigationProps) => {
  return <NavigationBar
    items={props.items}
    currentLocation={props.currentLocation}
    onNavigate={props.onNavigate}
    orientation={props.orientation}
    initiallyCollapsed={false}
    startItem={(itemProps: AdditionalItemProps) => getStartItem(props, itemProps)}
    lastItem={(itemProps: AdditionalItemProps) => getLastItem(props, itemProps)}
  />
}

function getStartItem(props: MainNavigationProps, itemProps: AdditionalItemProps) {
  return <StartItem {...itemProps}
    onLogoClick={() => props.onNavigate('/')}
    logo={props.logo}
    user={props.user}
    onUserClick={props.onUserClick}>
    {props.startItem ? props.startItem(itemProps) : null}
  </StartItem>
}

function getLastItem(props: MainNavigationProps, itemProps: AdditionalItemProps) {
  return <LastItem
    {...itemProps}
    version={props.version}
    user={props.user}
    onUserClick={props.onUserClick}
  >
    {props.lastItem ? props.lastItem(itemProps) : null}
  </LastItem>
}

export default MainNavigation
