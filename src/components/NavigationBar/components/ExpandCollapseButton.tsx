import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import styled from '../../../theme-styled'


interface ExpandCollapseButtonProps {
  collapsed: boolean
  onClick: () => void
}

const ExpandCollapseButtonContainer = styled.div<{ collapsed: boolean }>`
  float: right;
  text-align: center;
  overflow: visible;
  height: ${props => !props.collapsed ? '0px !important' : 'auto'};

  ${(props) => {
    if (!props.collapsed) {
      return `
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 0.3s, opacity 0.3s linear;
      `
    }
  }}
`

const ExpandCollapseButton = (props: ExpandCollapseButtonProps) => {
  const floated = props.collapsed ? undefined : 'right'
  const tooltip = props.collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'

  return (
    <ExpandCollapseButtonContainer
      className="expand-collapse-button-container"
      collapsed={props.collapsed}
    >
      <Popup
        content={tooltip}
        position="right center"
        trigger={
          <Button
            icon={`chevron ${props.collapsed ? 'right' : 'left'}`}
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
