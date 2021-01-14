import React, { useState, useCallback } from 'react'
import { NavigationItem, Orientation } from '.';
import NavigationContainer from './styled-components/NavigationContainer'
import NavigationItems from './components/NavigationItems'

export interface NavigationBarProps {
  currentLocation: string
  items: NavigationItem[]
  onNavigate: (path: string) => void
  initiallyCollapsed: boolean
  orientation: Orientation
}

const NavigationBar = (props: NavigationBarProps) => {
  const [collapsed, setCollapsed] = useState(!!props.initiallyCollapsed)
  const onNavigateItemClick = useCallback((item: NavigationItem) => props.onNavigate(item.path), [props.onNavigate])

  return <NavigationContainer $collapsed={collapsed} $orientation={props.orientation}>
    <NavigationItems orientation={props.orientation} collapsed={collapsed} items={props.items} onClick={onNavigateItemClick} />
  </NavigationContainer>
}

export default NavigationBar