import * as d3 from 'd3'
import _ from 'lodash'
import { ReactInstance, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

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
  const ref = useRef<any>(null)

  const isInBounds = (x: number, y: number) =>
    !_.isUndefined(keepInBounds) &&
    x >= 0 &&
    y >= 0 &&
    x <= keepInBounds.container.width - keepInBounds.element.width &&
    y <= keepInBounds.container.height - keepInBounds.element.height

  const onHandleDrag = d3
    .drag()
    .subject(function () {
      const me = d3.select(this)
      return { x: me.attr(xProperty), y: me.attr(yProperty) }
    })
    .on('drag', function (e) {
      const me = d3.select(this)
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

  useEffect(() => {
    if (ref.current) {
      const node = ReactDOM.findDOMNode(ref.current as ReactInstance) as Element
      onHandleDrag(d3.select(node))
    }
  }, [ref.current, onHandleDrag])

  return { ref }
}

export default useDrag
