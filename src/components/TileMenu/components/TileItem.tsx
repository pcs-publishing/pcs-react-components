import React, { useCallback } from 'react'
import { TileItemProps } from '..'
import { Icon, Header } from 'semantic-ui-react'
import styled from '../../../theme-styled'
import Box from '../../Styled/Box'

const TileItemContainer = styled(Box)<{ width?: number}>`
  width: ${props => props.width || 300}px;
  height: 150px;
  text-align: center;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.primary};
    box-shadow: 5px 5px 5px #eee;
    border: none;

    i,
    div {
      color: ${(props) =>
        props.theme.colors.text.onPrimary} !important;
    }
  }
`

const StyledHeader = styled(Header)``

const TileItem = (props: TileItemProps) => {
   const { name, icon, description, path, width, onClick } = props

  const handleClick = useCallback(() => {
    onClick({ name, path })
  }, [onClick, name, path])

    return (
    <TileItemContainer onClick={handleClick} width={width}>
      <StyledHeader icon color="grey">
        <Icon name={icon} />
        <StyledHeader.Content>
          {name}
          <StyledHeader.Subheader>{description}</StyledHeader.Subheader>
        </StyledHeader.Content>
      </StyledHeader>
    </TileItemContainer>
  )
}

export default TileItem
