import React from 'react'
import CollapsedNavigationItem from './CollapsedNavigationItem';
import ExpandedNavigationItem from './ExpandedNavigationItem'
import { NavigationItem, Orientation } from '..';
import NavigationMenu from '../styled-components/NavigationMenu';

interface NavigationItemsProps {
  items: NavigationItem[],
  collapsed: boolean
  orientation: Orientation
  onClick: (item: NavigationItem) => void
  currentLocation: string
}

const NavigationItems = (props: NavigationItemsProps) => {
  const NavigationItemComponent = props.orientation === 'vertical' && props.collapsed ? CollapsedNavigationItem : ExpandedNavigationItem
  const Wrapper = props.collapsed ? React.Fragment : NavigationMenu

  return <Wrapper orientation={props.orientation}>
    {props.items.map(item => (<NavigationItemComponent active={item.path === props.currentLocation} key={item.path} orientation={props.orientation} active={false} item={item} onClick={props.onClick} />))}
  </Wrapper>
}

export default NavigationItems