import React from 'react'
import styled from '../../theme-styled'

export interface VersionProps {
  version: string
  className?: string
  rotated?: boolean
}

const VersionContainer = styled.span<{ $rotated?: boolean }>`
  color: ${props => props.theme.colors.text.onBase};
  font-style: italic;
  text-align: center;
  font-size: 0.9em;
  ${props => props.$rotated ? `
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      transform: rotate(90deg);
  ` : ''}
`

const Version = (props: VersionProps) => {
  return <VersionContainer $rotated={props.rotated} className={props.className}>{`v${props.version}`}</VersionContainer>
}

export default Version