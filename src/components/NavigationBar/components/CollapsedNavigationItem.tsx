import React from 'react'
import { Popup } from 'semantic-ui-react'
import { NavigationItemProps } from '..'
import NavigationItemIcon from '../styled-components/NavigationItemIcon'

const CollapsedNavigationItem = (props: NavigationItemProps) => {
  return <Popup content={props.item.title} trigger={
    <NavigationItemIcon
      name={props.item.icon}
      size="large"
      onClick={() => props.onClick(props.item)}
    />
  } />
}

export default CollapsedNavigationItem