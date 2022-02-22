import React from 'react'
import ContextMenu, { ContextMenuProps, ContextMenuItems } from './ContextMenu'
import styled from 'styled-components'
import { useContextMenu, Separator } from 'react-contexify'
import Modal, { ModalContent } from '../Semantic-Themed/Modal'
import 'react-contexify/dist/ReactContexify.css'

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
  const items: ContextMenuItems<string> = [
    {
      action: 'rewind',
      text: 'Rewind',
      icon: 'backward'
    },
    {
      action: 'play',
      text: 'Play',
      icon: 'play',
      popupContent: 'Play Content!'
    },
    {
      action: 'pause',
      text: 'Pause',
      icon: 'pause'
    },
    {
      action: 'fast-forward',
      text: 'Fast-Forward',
      icon: 'forward'
    },
    <Separator />,
    {
      text: 'Sub Menu',
      items: [
        {
          action: 'question',
          text: 'Ask Question',
          icon: 'question circle'
        },
        {
          action: 'retweet',
          text: 'Retweet',
          icon: 'retweet'
        }
      ]
    }
  ]

  const { show } = useContextMenu({
    id: 'menuId'
  })

  return (
    <div>
      <ContextMenu id="menuId" items={items} onAction={props.onAction} />
      <StyledDiv onContextMenu={show}>
        Right-click to open the context-menu
      </StyledDiv>
    </div>
  )
}

export const DisabledItem = (props: ContextMenuProps<string>) => {
  const items: ContextMenuItems<string> = [
    {
      action: 'up',
      text: 'Turn Up',
      icon: 'volume up'
    },
    {
      action: 'down',
      text: 'Turn Off',
      disabled: true,
      icon: 'volume down'
    }
  ]

  const menuId = 'second-story'

  const { show } = useContextMenu({
    id: menuId
  })

  return (
    <div>
      <ContextMenu id={menuId} items={items} onAction={props.onAction} />
      <StyledDiv onContextMenu={show}>
        Right-click to open the context-menu
      </StyledDiv>
    </div>
  )
}

export const InAModal = (props: ContextMenuProps<string>) => {
  const items: ContextMenuItems<string> = [
    {
      action: 'up',
      text: 'Turn Up',
      icon: 'volume up'
    },
    {
      action: 'down',
      text: 'Turn Off',
      icon: 'volume down'
    }
  ]

  const menuId = 'second-story'

  const { show } = useContextMenu({
    id: menuId
  })

  return (
    <Modal open>
      <ModalContent>
        <ContextMenu id={menuId} items={items} onAction={props.onAction} />
        <StyledDiv onContextMenu={show}>
          Right-click to open the context-menu
        </StyledDiv>
      </ModalContent>
    </Modal>
  )
}
