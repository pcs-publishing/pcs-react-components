import React from 'react'
import { AdditionalItemProps } from '../../NavigationBar'
import styled from '../../../theme-styled'
import Version from '../../Version'
import { Orientation } from '../../NavigationBar/index';

const StyledVersion = styled(Version) <{ $orientation: Orientation }>`
  display: inline-block;
  ${props => props.$orientation === 'horizontal' ? `
    text-align: right;
    float: right;
  ` : `
    width: 100%;
    text-align: center;
  `}
`

const BottomAligner = styled.div`
  display: inline-block;
  height: 100%;
  vertical-align: bottom;
  width: 0;
`

interface VersionItemProps extends AdditionalItemProps {
  version: string
  className?: string
}

const VersionItem = (props: VersionItemProps) => {
  if (props.collapsed) {
    return null
  }
  return <>
    {props.orientation === 'vertical' ? <BottomAligner /> : null}
    <StyledVersion className={props.className} version={props.version} $orientation={props.orientation} />
  </>
}

export default VersionItem
