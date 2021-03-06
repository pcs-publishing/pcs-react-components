import React from 'react'
import CollapsedNavigationItem from './CollapsedNavigationItem'
import ExpandedNavigationItem from './ExpandedNavigationItem'
import { NavigationItem, Orientation } from '..'
import NavigationMenu from '../styled-components/NavigationMenu'
import Loader from '../../Semantic-Themed/Loader'
import { sortBy, last } from 'lodash'

interface NavigationItemsProps {
  items: NavigationItem[],
  loading?: boolean
  collapsed: boolean
  orientation: Orientation
  onClick: (item: NavigationItem) => void
  currentLocation: string
  compact?: boolean
}


const NavigationItems = (props: NavigationItemsProps) => {
  const NavigationItemComponent = (props.orientation === 'vertical' && props.collapsed) || props.compact ? CollapsedNavigationItem : ExpandedNavigationItem
  const activeItem = getActiveItem(props.items, props.currentLocation)
  const loader = <Loader active inline='centered' />
  const items = props.items.map(item => (<NavigationItemComponent active={activeItem?.path === item.path} key={item.path} orientation={props.orientation} item={item} onClick={props.onClick} />))

  const children = props.loading ? loader : items

  if (props.collapsed || props.collapsed) {
    return <>
      {children}
    </>
  }

  return <NavigationMenu orientation={props.orientation} compact={props.compact}>{children}</NavigationMenu>

}

function getActiveItem(items: NavigationItem[], currentLocation: string | undefined): NavigationItem | undefined {
  const exactMatch = items.find(item => item.path === currentLocation)

  if (exactMatch) {
    return exactMatch
  }

  const matches = items.filter(item => currentLocation?.startsWith(item.path))

  const sortedMatches = sortBy(matches, (partialMatch) => {
    return partialMatch.path.length
  }, '')

  // Return the match that has the longest path
  return last(sortedMatches)
}

export default NavigationItems
