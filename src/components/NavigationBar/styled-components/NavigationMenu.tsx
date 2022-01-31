import React from 'react'
import { Menu } from 'semantic-ui-react'
import styled from '../../../theme-styled'
import { FunctionComponent } from 'react'
import { Orientation } from '../index';

const StyledMenu = styled(Menu) <{ vertical: boolean, $compact: boolean }>`
  &.ui.menu {
    border: none;
    box-shadow: none;
    border-radius: 0;
    margin-top: 0;
    background: transparent;
    height: ${props => props.vertical ? 'auto' : '8px'};

    ${props => !props.vertical && props.$compact ? `
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      ` : ``
  }
  }
`

const NavigationMenu: FunctionComponent<{ orientation: Orientation, compact?: boolean }> = (props) => {
  return <StyledMenu vertical={props.orientation === 'vertical'} $compact={props.compact} borderless>{props.children}</StyledMenu>
}

export default NavigationMenu
