import React, { useState, useCallback } from 'react'
import { AdditionalItem, NavigationItem, Orientation } from '.'
import NavigationContainer from './styled-components/NavigationContainer'
import NavigationItems from './components/NavigationItems'
import ExpandCollapseButton from './components/ExpandCollapseButton'
export interface NavigationBarProps {
  currentLocation: string
  items: NavigationItem[]
  loadingItems?: boolean
  onNavigate: (path: string) => void
  initiallyCollapsed: boolean
  orientation: Orientation
  startItem?: AdditionalItem
  lastItem?: AdditionalItem
  className?: string
  expandedWidth?: number
}

const NavigationBar = (props: NavigationBarProps) => {
  const [collapsed, setCollapsed] = useState(!!props.initiallyCollapsed)
  const onNavigateItemClick = useCallback((item: NavigationItem) => props.onNavigate(item.path), [props.onNavigate])
  const StartItem = props.startItem
  const LastItem = props.lastItem
  const commonProps = { orientation: props.orientation, collapsed }

  const toggleCollapsed = () => {
    setCollapsed(collapsed => !collapsed)
  }

  const ExpandCollapse = <ExpandCollapseButton collapsed={collapsed} orientation={props.orientation} onClick={toggleCollapsed} />

  return <NavigationContainer $collapsed={collapsed} $orientation={props.orientation} className={props.className} $expandedWidth={props.expandedWidth}>
    {!collapsed && ExpandCollapse}
    {StartItem ? <StartItem {...commonProps} /> : null}
    <NavigationItems {...commonProps} loading={props.loadingItems} currentLocation={props.currentLocation} items={props.items} onClick={onNavigateItemClick} />
    {LastItem ? <LastItem {...commonProps} /> : null}
    {collapsed && ExpandCollapse}
  </NavigationContainer>
}

export default NavigationBar
