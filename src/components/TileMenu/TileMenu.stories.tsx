import React from 'react'
import TileMenu from './TileMenu'
import { TileMenuProps } from '.';

export default {
  title: 'Tile Menu',
  component: TileMenu,
  argTypes: { onItemClick: { action: 'itemClick' }}
}

export const Example = (props: TileMenuProps) => {
  return <TileMenu {...props}/>
}

Example.args = {
  items: [{
    name: 'Statistics',
    description: 'It\'s not the statistics!',
    icon: 'chart line',
    path: '/stats'
  }, {
    name: 'Stationary',
    description: 'View all of your stationary here',
    icon: 'paperclip',
    path: '/stationary'
  }, {
    name: 'Play Chess',
    description: 'Sit back and relax with a game of chess',
    icon: 'chess',
    path: '/play-chess'
    }, {
    name: 'Bugs',
    description: 'For your own safety, do no stare directly at the bugs',
    icon: 'bug',
    path: '/too-many-bugs'
  }]
}
