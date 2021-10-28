import * as d3Drag from 'd3-drag'
import * as d3Select from 'd3-selection'
import _ from 'lodash'
import { useCallback } from 'react'

const useDrag = (
  xProperty: string,
  yProperty: string,
  keepInBounds?: {
    container: { width: number; height: number }
    element: { width: number; height: number }
  },
  onDrag?: (x: number, y: number) => void,
  onDragEnd?: (x: number, y: number) => void
) => {
  const isInBounds = (x: number, y: number) =>
    !_.isUndefined(keepInBounds) &&
    x >= 0 &&
    y >= 0 &&
    x <= keepInBounds.container.width - keepInBounds.element.width &&
    y <= keepInBounds.container.height - keepInBounds.element.height

  const onHandleDrag = d3Drag
    .drag()
    .subject(function () {
      const me = d3Select.select(this)
      return { x: me.attr(xProperty), y: me.attr(yProperty) }
    })
    .on('drag', function (e) {
      const me = d3Select.select(this)
      let canDrag = true
      if (keepInBounds) {
        canDrag = isInBounds(e.x, e.y)
      }

      if (canDrag) {
        me.attr(xProperty, e.x)
        me.attr(yProperty, e.y)
      }

      if (onDrag) {
        onDrag(e.x, e.y)
      }
    })
    .on('end', (e) => {
      let canEnd = true

      if (keepInBounds) {
        canEnd = isInBounds(e.x, e.y)
      }

      if (onDragEnd && canEnd) {
        onDragEnd(e.x, e.y)
      }
    })

  const setRef = useCallback(
    (node) => {
      if (node) {
        onHandleDrag(d3Select.select(node))
      }
    },
    [onHandleDrag]
  )

  return setRef
}

export default useDrag
