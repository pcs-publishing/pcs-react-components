import React from 'react'
import { Icon } from 'semantic-ui-react'
import { NavigationItemProps, Orientation } from '..'
import Popup from '../../Semantic-Themed/Popup'
import styled from '../../../theme-styled'

const IconContainer = styled.div<{ $active: boolean, $orientation: Orientation }>`
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;

  ${props => props.$orientation === 'horizontal' ? 'margin-right: 20px;' : 'margin-bottom: 20px;'}

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.$active ? `
    background: rgba(255, 255, 255, 0.2);
  ` : ''
  }


`

const Central = styled.div`
width: 100 %;
text - align: center;
`

const CollapsedNavigationItem = (props: NavigationItemProps) => {
  return <IconContainer $active={props.active} $orientation={props.orientation} onClick={() => props.onClick(props.item)}>
    <Popup content={props.item.title} position={props.orientation === 'vertical' ? 'right center' : 'bottom center'} trigger={
      <Central>
        <Icon
          name={props.item.icon}
          size="large"
          onClick={() => props.onClick(props.item)}
        />
      </Central>
    } />
  </IconContainer>
}

export default CollapsedNavigationItem
