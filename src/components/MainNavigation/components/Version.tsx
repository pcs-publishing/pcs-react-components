import React from 'react'
import { AdditionalItemProps } from '../../NavigationBar'
import styled from '../../../theme-styled'
import Version from '../../Version'
import { Orientation } from '../../NavigationBar/index';

const VersionContainer = styled.div`
  flex-grow: 1;
`

const StyledVersion = styled(Version) <{ $orientation: Orientation }>`
  display: inline-block;
  ${props => props.$orientation === 'horizontal' ? 'float: right;' : ''}
`

const BottomAligner = styled.div`
  display: inline-block;
  height: 100%;
  vertical-align: bottom;
  width: 0;
`

const VersionItem = (props: AdditionalItemProps) => {
  if (props.collapsed) {
    return null
  }
  return <VersionContainer>
    <BottomAligner />
    <StyledVersion version="1.0.1" $orientation={props.orientation} />
  </VersionContainer>
}

export default VersionItem
