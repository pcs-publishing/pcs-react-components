import React from 'react'
import styled from '../../../theme-styled'
import { Menu } from 'semantic-ui-react'
import NavigationItemIcon from '../styled-components/NavigationItemIcon'
import { NavigationItemProps } from '..'
import Chevron from './Chevron'
import { Orientation } from '../index';

const StyledMenuItem = styled(Menu.Item) <{ $active: boolean, $orientation: Orientation }>`
  font-family: sans-serif;
  font-size: 1.15em;
  background-color: transparent;
  color: ${props => props.theme.colors.text.onPrimary} !important;
  cursor: pointer;

  ${props => props.$orientation === 'vertical' ? 'width: 100%;' : ''}

  &.active {
    background-color: rgba(255, 255, 255, 0.1) !important;
    font-style: bolder !important;
  }

  :hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
`

const ExpandedNavigationItem = (props: NavigationItemProps) => {
  return <StyledMenuItem $active={props.active} $orientation={props.orientation}>
    <NavigationItemIcon name={props.item.icon} />
    {props.item.title}
    <Chevron />
  </StyledMenuItem>
}

export default ExpandedNavigationItem