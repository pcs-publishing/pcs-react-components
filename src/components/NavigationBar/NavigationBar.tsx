import React, { useState, useCallback } from 'react'
import { NavigationItem, Orientation } from '.';
import NavigationContainer from './styled-components/NavigationContainer'
import NavigationItems from './components/NavigationItems'
import { FunctionComponent } from 'react';

export type AdditionalItem = FunctionComponent<AdditionalItemProps>
export interface AdditionalItemProps {
  collapsed: boolean
  orientation: Orientation
}

export interface NavigationBarProps {
  currentLocation: string
  items: NavigationItem[]
  onNavigate: (path: string) => void
  initiallyCollapsed: boolean
  orientation: Orientation
  topItem?: AdditionalItem
  bottomItem?: AdditionalItem
}

const NavigationBar = (props: NavigationBarProps) => {
  const [collapsed, setCollapsed] = useState(!!props.initiallyCollapsed)
  const onNavigateItemClick = useCallback((item: NavigationItem) => props.onNavigate(item.path), [props.onNavigate])
  const TopItem = props.topItem
  const BottomItem = props.bottomItem

  return <NavigationContainer $collapsed={collapsed} $orientation={props.orientation}>
    {TopItem ? <TopItem collapsed={collapsed} orientation={props.orientation} /> : null}
    <NavigationItems orientation={props.orientation} collapsed={collapsed} items={props.items} onClick={onNavigateItemClick} />
    {BottomItem ? <BottomItem collapsed={collapsed} orientation={props.orientation} /> : null}
  </NavigationContainer>
}

export default NavigationBar