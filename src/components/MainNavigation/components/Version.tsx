import React from 'react'
import { AdditionalItemProps } from '../../NavigationBar'
import styled from '../../../theme-styled'
import Version from '../../Version'
import { Orientation } from '../../NavigationBar/index';

const StyledVersion = styled(Version) <{ $orientation: Orientation, $collapsed: boolean }>`
  display: inline-block;
  ${props => props.$orientation === 'horizontal' ? `
    text-align: right;
    float: right;
    padding: 10px !important;
  ` : `
    width: 100%;
    text-align: center;
    align-self: flex-end;
  `}


  ${props => props.$collapsed ? 'font-size: 0.8em;' : ''}
`

interface VersionItemProps extends AdditionalItemProps {
  version: string
  className?: string
}

const VersionItem = (props: VersionItemProps) => {
  return <StyledVersion
    className={props.className}
    version={props.version}
    $collapsed={props.collapsed}
    $orientation={props.orientation}
  />
}

export default VersionItem
