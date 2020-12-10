import React from 'react'
import { SemanticICONS, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { Menu, Item } from 'react-contexify'

import 'react-contexify/dist/ReactContexify.css';

const StyledMenu = styled(Menu)`
  border-radius: 3px;
  z-index: 1000 !important;
`

export interface MenuItemEventHandler {
  event?: MouseEvent & TouchEvent
  props?: {
    [key: string]: any
  }
}

const StyledItem = styled(Item)<{ $selectedBackgroundColor: string, $selectedTextColor: string}>`
  display: block;
  font-size: 1.1em;
  padding-left: 5px;
  padding-right: 5px;

  div {
    padding: 8px;
  }

  :hover {
    div {
      background: ${(props) => props.$selectedBackgroundColor} !important;
      color: ${(props) =>
        props.$selectedTextColor} !important;
      border-radius: 5px;
    }
  }
`

const FloatRightText = styled.span`
  float: right !important;
`

export interface ContextMenuItem<T> {
  text: string
  action: T
  icon: SemanticICONS
  disabled?: boolean | ((params: MenuItemEventHandler) => boolean)
}

export interface ContextMenuProps<T> {
  id: string
  items: ContextMenuItem<T>[]
  onAction: (action: T, args: MenuItemEventHandler) => void | Promise<void>
  selectedItemBackgroundColor?: string
  selectedItemTextColor?: string
}

const ContextMenu = <T extends any>({
  id,
  items,
  onAction,
  selectedItemBackgroundColor,
  selectedItemTextColor
}: ContextMenuProps<T>) => {


  return (
    <StyledMenu id={id} animation="pop">
      {items.map((item) => {
        const disabled = item.disabled ? item.disabled : false
        return (
          <StyledItem
            key={item.text}
            disabled={disabled}
            onClick={(args: any) => onAction(item.action, args as MenuItemEventHandler)}
            $selectedBackgroundColor={selectedItemBackgroundColor || '#3498db'}
            $selectedTextColor={selectedItemTextColor || 'white'}
          >
            <Icon name={item.icon} />
            <FloatRightText>{item.text}</FloatRightText>
          </StyledItem>
        )
      })}
    </StyledMenu>
  )
}

export default ContextMenu
