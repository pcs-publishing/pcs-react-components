import React from 'react'
import { Menu } from 'semantic-ui-react'
import styled from '../../../theme-styled'
import { FunctionComponent } from 'react'
import { Orientation } from '../index';

const StyledMenu = styled(Menu) <{ vertical: boolean }>`
  background: transparent !important;
  height: auto;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding-top: 5px;

  .menu-header {
    padding-bottom: 5px;
    padding-left: 5px;
  }
`

const NavigationMenu: FunctionComponent<{ orientation: Orientation }> = (props) => {
  return <StyledMenu vertical={props.orientation === 'vertical'} borderless>{props.children}</StyledMenu>
}

export default NavigationMenu
