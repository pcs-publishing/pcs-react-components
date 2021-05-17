import React from 'react'
import CollapsedNavigationItem from './CollapsedNavigationItem';
import ExpandedNavigationItem from './ExpandedNavigationItem'
import { NavigationItem, Orientation } from '..';
import NavigationMenu from '../styled-components/NavigationMenu';
import { Loader } from 'semantic-ui-react'

interface NavigationItemsProps {
  items: NavigationItem[],
  loading?: boolean
  collapsed: boolean
  orientation: Orientation
  onClick: (item: NavigationItem) => void
  currentLocation: string
}


const NavigationItems = (props: NavigationItemsProps) => {
  const NavigationItemComponent = props.orientation === 'vertical' && props.collapsed ? CollapsedNavigationItem : ExpandedNavigationItem
  const loader = <Loader active inline='centered' />
  const items = props.items.map(item => (<NavigationItemComponent active={item.path === props.currentLocation} key={item.path} orientation={props.orientation} item={item} onClick={props.onClick} />))

  const children = props.loading ? loader : items

  if (props.collapsed) {
    return <>
      {children}
    </>
  }

  return <NavigationMenu orientation={props.orientation}>{children}</NavigationMenu>

}

export default NavigationItems
