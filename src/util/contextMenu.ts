import {
  ContextMenuItem,
  SubMenuItem
} from '../components/ContextMenu/ContextMenu'

export function instanceOfContextMenuItem<T extends any>(
  item: ContextMenuItem<T> | SubMenuItem<T> | React.ReactElement
): item is ContextMenuItem<T> {
  return 'action' in item
}

export function instanceOfSubMenuItem<T extends any>(
  item: ContextMenuItem<T> | SubMenuItem<T> | React.ReactElement
): item is ContextMenuItem<T> {
  return 'items' in item
}
