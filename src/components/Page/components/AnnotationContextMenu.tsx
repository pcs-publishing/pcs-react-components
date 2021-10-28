import React, { useCallback, useRef } from 'react'
import { AnnotationType } from '../../../definitions'
import ContextMenu from '../../ContextMenu'
import {
  ContextMenuItems,
  MenuItemEventHandler
} from '../../ContextMenu/ContextMenu'

interface AnnotationContextMenuProps {
  id: string
  onAction: (action: AnnotationType, position: { x: number; y: number }) => void
}

const AnnotationContextMenu = (props: AnnotationContextMenuProps) => {
  const { onAction: onAnnotationAction } = props
  const onAction = useCallback(
    (action: AnnotationType, e: MenuItemEventHandler) => {
      const position = e.props?.position ?? { x: 0, y: 0 }
      onAnnotationAction(action, position)
    },
    [onAnnotationAction]
  )

  const items: ContextMenuItems<AnnotationType> = [
    { icon: 'comment', action: 'comment', text: 'Add comment' }
  ]

  return <ContextMenu id={props.id} onAction={onAction} items={items} />
}

export default AnnotationContextMenu
