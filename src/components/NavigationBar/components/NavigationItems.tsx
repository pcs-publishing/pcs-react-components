import React from 'react'
import CollapsedNavigationItem from './CollapsedNavigationItem';
import ExpandedNavigationItem from './ExpandedNavigationItem'
import { NavigationItem, Orientation } from '..';
import NavigationMenu from '../styled-components/NavigationMenu';
import styled from '../../../theme-styled';

interface NavigationItemsProps {
  items: NavigationItem[],
  collapsed: boolean
  orientation: Orientation
  onClick: (item: NavigationItem) => void
  currentLocation: string
}

const NavigationItems = (props: NavigationItemsProps) => {
  const NavigationItemComponent = props.orientation === 'vertical' && props.collapsed ? CollapsedNavigationItem : ExpandedNavigationItem

  const items = props.items.map(item => (<NavigationItemComponent active={item.path === props.currentLocation} key={item.path} orientation={props.orientation} item={item} onClick={props.onClick} />))

  if (props.collapsed) {
    return <>
      {items}
    </>
  }

  return <NavigationMenu orientation={props.orientation}>{items}</NavigationMenu>

}

export default NavigationItems
