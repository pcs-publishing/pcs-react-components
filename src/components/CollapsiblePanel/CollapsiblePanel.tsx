import React, { useState, useCallback, ReactNode } from 'react'
import styled from 'styled-components'
import { Button, Header } from 'semantic-ui-react'

export interface CollapsiblePanelProps {
  children: ReactNode
  title?: string
  header?: ReactNode
  className?: string
  initialState?: 'collapsed' | 'expanded'
  onClear?: () => void
}

const Panel = styled.div<{ collapsed: boolean }>`
  transition: width 0.15s;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  ${(props) =>
    props.collapsed
      ? `
        width: 48px !important;
        overflow: hidden;
      `
      : ''};
`

const CollapsedTitle = styled.span`
  writing-mode: vertical-rl;
  padding: 8px;
`

const ExpandedTitle = styled(Header)`
  text-align: center;
`

const ButtonContainer = styled.div<{ clear: boolean | undefined }>`
  ${(props) =>
    props.clear
      ? `display: flex; justify-content: space-between`
      : `text-align: right`}
`

const HeaderContainer = styled.div`
  padding: 5px;
`

const ChildrenContainer = styled.div<{ collapsed: boolean }>`
  transition: opacity 0.15s;
  opacity: ${(props) => (props.collapsed ? 0 : 1)};
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  flex-grow: 1;
  height: 0;
`

const CollapsiblePanel = (props: CollapsiblePanelProps) => {
  const [collapsed, setCollapsed] = useState(props.initialState === 'collapsed')
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), [
    setCollapsed
  ])
  const icon = collapsed ? 'angle right' : 'angle left'
  return (
    <Panel className={props.className} collapsed={collapsed}>
      <HeaderContainer>
        <ButtonContainer clear={!collapsed}>
          {!collapsed && props.onClear ? (
            <Button
              circular
              icon="close"
              size="tiny"
              onClick={() => {
                if (props.onClear) {
                  props.onClear()
                }
              }}
            />
          ) : null}
          <Button circular icon={icon} size="tiny" onClick={toggleCollapsed} />
        </ButtonContainer>
        {collapsed ? (
          <CollapsedTitle>{props.title}</CollapsedTitle>
        ) : (
          <>
            {!!props.title ? (
              <ExpandedTitle>{props.title}</ExpandedTitle>
            ) : null}
            {props.header}
          </>
        )}
      </HeaderContainer>
      <ChildrenContainer collapsed={collapsed}>
        {collapsed ? null : props.children}
      </ChildrenContainer>
    </Panel>
  )
}

export default CollapsiblePanel
