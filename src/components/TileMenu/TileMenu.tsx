import React from 'react'
import { TileMenuProps } from '.'
import TileItem from './components/TileItem'
import FlexMenuContainer from '../Styled/FlexContainer'

const TileMenu = (props: TileMenuProps) => {
  return (
    <FlexMenuContainer>
      {props.items.map((item, index) => (
        <TileItem key={`${item.name}-${index}`} {...item} onClick={props.onItemClick} width={props.tileItemWidth} />
      ))}
    </FlexMenuContainer>
  )
}

export default TileMenu
