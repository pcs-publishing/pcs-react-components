import React from 'react'
import { Button, Popup, SemanticICONS } from 'semantic-ui-react';
import { Orientation } from '..'
import styled from '../../../theme-styled'


interface CollapseButtonProps {
  collapsed: boolean
  orientation: Orientation
  onClick: () => void
}

const CollapseButtonContainer = styled.div<{ collapsed: boolean }>`
  float: right;
  text-align: center;
  overflow: visible;
  height: ${props => !props.collapsed ? '0px !important' : 'auto'};

  ${(props) => !props.collapsed ? `
    visibility: hidden;opacity: 0;
    transition: visibility 0s 0.3s, opacity 0.3s linear;
  ` : ''}
`

const CollapseButton = (props: CollapseButtonProps) => {
  const floated = props.collapsed ? undefined : 'right'
  const tooltip = props.collapsed ? 'Expand Navigation' : 'Collapse Navigation'
  const icon = getButtonIcon(props.collapsed)

  if (props.orientation !== 'vertical') {
    return null
  }

  return (
    <CollapseButtonContainer
      className="collapse-button-container"
      collapsed={props.collapsed}
    >
      <Popup
        content={tooltip}
        position="right center"
        trigger={
          <Button
            icon={icon}
            circular
            size="tiny"
            basic
            inverted
            compact
            floated={floated}
            onClick={props.onClick}
          />
        }
      />
    </CollapseButtonContainer>
  )
}

export default CollapseButton


function getButtonIcon(collapsed: boolean): SemanticICONS {
  return collapsed ? 'chevron right' : 'chevron left'
}