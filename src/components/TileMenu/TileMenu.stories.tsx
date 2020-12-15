import React from 'react'
import TileMenu from './TileMenu'
import { TileMenuProps } from '.';

export default {
  title: 'Tile Menu',
  component: TileMenu
}

const Template = (props: TileMenuProps) => {
  return <TileMenu {...props}/>
}
