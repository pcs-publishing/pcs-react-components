import { SemanticICONS } from 'semantic-ui-react'
import NavigationBar from './NavigationBar'

export default NavigationBar

export interface NavigationItem {
  title: string
  icon: SemanticICONS
  path: string
  disabled?: boolean
}

export interface NavigationItemProps {
  item: NavigationItem
  active: boolean
  orientation: Orientation
  onClick: (item: NavigationItem) => void
}

export type Orientation = 'vertical' | 'horizontal'
