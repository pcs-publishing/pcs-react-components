import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'
import { NavigationItemProps } from '..'
import styled from '../../../theme-styled'

const IconContainer = styled.div<{ $active: boolean }>`
  border-radius: 3px;
  padding: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.$active ? `
    background: rgba(255, 255, 255, 0.2);
  ` : ''}


`

const Central = styled.div`
  width: 100%;
  text-align: center;
`

const CollapsedNavigationItem = (props: NavigationItemProps) => {
  return <IconContainer $active={props.active} onClick={() => props.onClick(props.item)}>
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
