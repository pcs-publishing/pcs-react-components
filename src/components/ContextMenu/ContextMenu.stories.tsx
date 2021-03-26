import React from 'react'
import ContextMenu, { ContextMenuItem, ContextMenuProps } from './ContextMenu';
import styled from 'styled-components'
import { useContextMenu } from 'react-contexify'
import { Modal } from 'semantic-ui-react'
import 'react-contexify/dist/ReactContexify.css';

export default {
  title: 'Context Menu',
  component: ContextMenu,
  argTypes: { onAction: { action: 'action' } }
}

const StyledDiv = styled.div`
  background-color: #eee;
  border: 1px solid #aaa;
  border-radius: 5px;
  width: 300px;
  height: 200px;
  padding: 20px;
`

export const Basic = (props: ContextMenuProps<string>) => {
  const items: ContextMenuItem<string>[] = [{
    action: 'rewind',
    text: 'Rewind',
    icon: 'backward'
  }, {
    action: 'play',
    text: 'Play',
    icon: 'play'
  }, {
    action: 'pause',
    text: 'Pause',
    icon: 'pause'
  }, {
    action: 'fast-forward',
    text: 'Fast-Forward',
    icon: 'forward'
  }]

  const { show } = useContextMenu({
    id: 'menuId'
  })


  return <div>
    <ContextMenu id="menuId" items={items} onAction={props.onAction} />
    <StyledDiv onContextMenu={show}>Right-click to open the context-menu</StyledDiv>
  </div>
}

export const DisabledItem = (props: ContextMenuProps<string>) => {
  const items: ContextMenuItem<string>[] = [{
    action: 'up',
    text: 'Turn Up',
    icon: 'volume up'
  }, {
    action: 'down',
    text: 'Turn Off',
    disabled: true,
    icon: 'volume down'
  }]

  const menuId = 'second-story'

  const { show } = useContextMenu({
    id: menuId
  })

  return <div>
    <ContextMenu id={menuId} items={items} onAction={props.onAction} />
    <StyledDiv onContextMenu={show}>Right-click to open the context-menu</StyledDiv>
  </div>
}

export const InAModal = (props: ContextMenuProps<string>) => {
  const items: ContextMenuItem<string>[] = [{
    action: 'up',
    text: 'Turn Up',
    icon: 'volume up'
  }, {
    action: 'down',
    text: 'Turn Off',
    icon: 'volume down'
  }]

  const menuId = 'second-story'

  const { show } = useContextMenu({
    id: menuId
  })

  return <Modal open>
    <Modal.Content>
      <ContextMenu id={menuId} items={items} onAction={props.onAction} />
      <StyledDiv onContextMenu={show}>Right-click to open the context-menu</StyledDiv>
    </Modal.Content>
  </Modal>
}
