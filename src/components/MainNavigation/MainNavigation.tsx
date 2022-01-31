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
  loadingItems?: boolean
  orientation: Orientation
  user?: MainNavigationUser
  onUserClick?: () => void
  onNavigate: (path: string) => void
  startItem?: AdditionalItem
  lastItem?: AdditionalItem
  className?: string
  expandedWidth?: number
  compact?: boolean
}

const MainNavigation = (props: MainNavigationProps) => {
  return <NavigationBar
    items={props.items}
    loadingItems={props.loadingItems}
    currentLocation={props.currentLocation}
    onNavigate={props.onNavigate}
    orientation={props.orientation}
    initiallyCollapsed={false}
    startItem={(itemProps: AdditionalItemProps) => getStartItem(props, itemProps)}
    lastItem={(itemProps: AdditionalItemProps) => getLastItem(props, itemProps)}
    expandedWidth={props.expandedWidth}
    className={props.className}
    compact={props.compact}
  />
}

function getStartItem(props: MainNavigationProps, itemProps: AdditionalItemProps) {
  return <StartItem {...itemProps}
    onLogoClick={() => props.onNavigate('/')}
    logo={props.logo}
    user={props.user}
    onUserClick={props.onUserClick}
    compact={props.compact}>
    {props.startItem ? props.startItem(itemProps) : null}
  </StartItem>
}

function getLastItem(props: MainNavigationProps, itemProps: AdditionalItemProps) {
  return <LastItem
    {...itemProps}
    version={props.version}
    user={props.user}
    onUserClick={props.onUserClick}
    compact={props.compact}
  >
    {props.lastItem ? props.lastItem(itemProps) : null}
  </LastItem>
}

export default MainNavigation
