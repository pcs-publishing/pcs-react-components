import React from 'react'
import { Menu } from 'semantic-ui-react'
import styled from '../../../theme-styled'
import { FunctionComponent } from 'react'
import { Orientation } from '../index';

const StyledMenu = styled(Menu) <{ vertical: boolean }>`
  background: transparent !important;
  height: ${props => props.vertical ? 'auto' : '8px'};
  box-shadow: none !important;
  border-radius: 0 !important;
  margin-top: 0 !important;
  border: none !important;
`

const NavigationMenu: FunctionComponent<{ orientation: Orientation }> = (props) => {
  return <StyledMenu vertical={props.orientation === 'vertical'} borderless>{props.children}</StyledMenu>
}

export default NavigationMenu
