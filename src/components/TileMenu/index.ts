import TileMenu from './TileMenu'
import { SemanticICONS } from 'semantic-ui-react'

export interface TileItemProps {
  name: string
  description: string
  icon: SemanticICONS
  onClick?: (item: { name: string; path?: string }) => void
  path?: string
  width?: number
}

export interface TileMenuProps {
  items: TileItemProps[]
  onItemClick?: (item: { name: string; path?: string }) => void
  tileItemWidth?: number
}

export default TileMenu
