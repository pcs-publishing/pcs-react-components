import React, { useState, useCallback, useEffect } from 'react'
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
  compact?: boolean
}

const NAVIGATION_COLLAPSED_KEY = 'NAVIGATION_COLLAPSED'

const NavigationBar = (props: NavigationBarProps) => {
  const [collapsed, setCollapsed] = useState(!!props.initiallyCollapsed)
  const onNavigateItemClick = useCallback((item: NavigationItem) => props.onNavigate(item.path), [props.onNavigate])
  const StartItem = props.startItem
  const LastItem = props.lastItem
  const commonProps = { orientation: props.orientation, collapsed, compact: props.compact }

  useEffect(() => {
    const value = localStorage.getItem(NAVIGATION_COLLAPSED_KEY)
    if (value) {
      setCollapsed(value === 'true')
    }
  }, [])

  useEffect(() => {
    const value = localStorage.getItem(NAVIGATION_COLLAPSED_KEY) === 'true'
    if (value !== collapsed) {
      localStorage.setItem(NAVIGATION_COLLAPSED_KEY, collapsed.toString())
    }
  }, [collapsed])

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
