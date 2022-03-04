import React from 'react'
import { SemanticICONS } from 'semantic-ui-react'
import { Orientation } from '..'
import styled from '../../../theme-styled'
import Button from '../../Semantic-Themed/Button'
import Popup from '../../Semantic-Themed/Popup'

interface ExpandCollapseButtonProps {
  collapsed: boolean
  orientation: Orientation
  onClick: () => void
}

const ExpandCollapseButtonContainer = styled.div<{ collapsed: boolean }>`
  float: right;
  text-align: center;
  overflow: visible;
  height: ${props => !props.collapsed ? '0px !important' : 'auto'};

  ${(props) => !props.collapsed ? `
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.3s, opacity 0.3s linear;
  ` : ''}
`

const ExpandCollapseButton = (props: ExpandCollapseButtonProps) => {
  const floated = props.collapsed ? undefined : 'right'
  const tooltip = props.collapsed ? 'Expand Navigation' : 'Collapse Navigation'
  const icon = getButtonIcon(props.collapsed)

  if (props.orientation !== 'vertical') {
    return null
  }

  return (
    <ExpandCollapseButtonContainer
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
    </ExpandCollapseButtonContainer>
  )
}

export default ExpandCollapseButton


function getButtonIcon(collapsed: boolean): SemanticICONS {
  return collapsed ? 'chevron right' : 'chevron left'
}
