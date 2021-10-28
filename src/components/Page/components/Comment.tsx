import React, { useState } from 'react'
import { Popup } from 'semantic-ui-react'
import { AnnotationProps } from '../plugins/withImage'
import useDrag from '../../../hooks/useDrag'
import AnnotationControls from './AnnotationControls'
import styled from '../../../theme-styled'

const Image = styled.image`
  cursor: pointer;
`

const ContentHolder = styled.div`
  white-space: pre-line;
`

const Comment = (props: AnnotationProps) => {
  const { onDragEnd, color } = props
  const keepInBounds = {
    container: {
      height: props.bounds.height,
      width: props.bounds.width
    },
    element: {
      height: props.bounds.iconSize ?? 30,
      width: props.bounds.iconSize ?? 30
    }
  }
  const { ref } = useDrag('x', 'y', keepInBounds, undefined, onDragEnd)
  const [open, setOpen] = useState({ hover: false, click: false })

  return (
    <Popup
      key={props.content}
      content={<ContentHolder>{props.content}</ContentHolder>}
      open={open.hover}
      trigger={
        <Popup
          open={open.click}
          content={
            <AnnotationControls
              onDelete={props.onDelete}
              content={props.content}
              onChange={props.onChange}
            />
          }
          trigger={
            <Image
              ref={ref}
              height={keepInBounds.element.height}
              width={keepInBounds.element.width}
              href={`./annotation/comment-${color}.svg`}
              x={props.x}
              y={props.y}
              onClick={() => setOpen({ click: !open.click, hover: false })}
              onMouseOver={() =>
                !open.click
                  ? setOpen((prevState) => ({ ...prevState, hover: true }))
                  : null
              }
              onMouseLeave={() =>
                !open.click && open.hover
                  ? setOpen((prevState) => ({ ...prevState, hover: false }))
                  : null
              }
            />
          }
        />
      }
    />
  )
}

export default Comment
