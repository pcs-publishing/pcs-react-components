import React from 'react'
import { SemanticICONS, Icon, Portal, Popup } from 'semantic-ui-react'
import styled, { css } from '../../theme-styled'
import { Menu, Item, Submenu, Separator } from 'react-contexify'

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
  border: none !important;
  outline: none !important;

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
  popupContent?: string
  extraData?: any
}

export interface SubMenuItem<T> {
  title: string
  arrow?: React.ReactNode
  items: ContextMenuItem<T>[]
}

export interface ContextMenuProps<T> {
  id: string
  items: ContextMenuItem<T>[]
  subMenuItems?: SubMenuItem<T>[]
  onAction: (
    action: T,
    args: MenuItemEventHandler,
    extraData?: any
  ) => void | Promise<void>
  selectedItemBackgroundColor?: string
  selectedItemTextColor?: string
}

const ContextMenu = <T extends any>({
  id,
  items,
  onAction,
  subMenuItems
}: ContextMenuProps<T>) => {
  return (
    <Portal open>
      <StyledMenu id={id}>
        {items.map((item) => {
          return getContextMenuItem(item, onAction)
        })}
        {subMenuItems && subMenuItems.length > 0 ? <Separator /> : null}
        {subMenuItems?.map((subMenuItem) => {
          return (
            <Submenu label={subMenuItem.title} arrow={subMenuItem.arrow}>
              {subMenuItem.items.map((item) => {
                return getContextMenuItem(item, onAction)
              })}
            </Submenu>
          )
        })}
      </StyledMenu>
    </Portal>
  )
}

const getContextMenuItem = <T extends any>(
  item: ContextMenuItem<T>,
  onAction: (
    action: T,
    args: MenuItemEventHandler,
    extraData?: any
  ) => void | Promise<void>
) => {
  const disabled = item.disabled ? item.disabled : false
  const Item = (
    <StyledItem
      key={item.text}
      disabled={disabled}
      onClick={(args: any) =>
        onAction(item.action, args as MenuItemEventHandler, item.extraData)
      }
    >
      <Icon name={item.icon} />
      <FloatRightText>{item.text}</FloatRightText>
    </StyledItem>
  )
  return item.popupContent ? (
    <Popup content={item.popupContent} trigger={<span>{Item}</span>} />
  ) : (
    Item
  )
}

export default ContextMenu
