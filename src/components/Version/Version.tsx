import React from 'react'
import styled from '../../theme-styled'

export interface VersionProps {
  version: string
  className?: string
}

const VersionContainer = styled.span`
  color: ${props => props.theme.colors.text.onBase};
  font-style: italic;
  text-align: center;
  font-size: 0.9em;
  width: 100%;
`

const Version = (props: VersionProps) => {
  return <VersionContainer className={props.className}>{`v${props.version}`}</VersionContainer>
}

export default Version