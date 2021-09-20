import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from '../../theme-styled'

export interface LinkButtonProps {
  linked: boolean
  onChange: (linked: boolean) => void
}

const StyledIcon = styled(Icon)`
  cursor: pointer;
`

const LinkButton = (props: LinkButtonProps) => {
  const onClick = () => {
    props.onChange(!props.linked)
  }
  return <StyledIcon name={props.linked ? 'linkify' : 'unlink'} onClick={onClick} />
}

export default LinkButton
