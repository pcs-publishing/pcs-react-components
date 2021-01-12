import React from 'react'
import { SemanticICONS, Icon } from 'semantic-ui-react'
import styled, { css } from '../../theme-styled'
import { Menu, Item } from 'react-contexify'

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

const HighlightContextItem = css`
  div {
    background: ${(props) => props.theme.colors.primary} !important;
    color: ${(props) => props.theme.colors.text.onPrimary} !important;
    border-radius: 5px;
  }
`

const StyledItem = styled(Item)`
  display: block;
  font-size: 1.1em;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;

  div {
    padding: 8px;
  }

  :hover {
    ${HighlightContextItem}
  }

  :focus {
    ${HighlightContextItem}
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
  onAction: (action: T, args: MenuItemEventHandler) => (void | Promise<void>)
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
