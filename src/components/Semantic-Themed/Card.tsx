import React from 'react'
import { Card, CardProps } from 'semantic-ui-react'
import styled from '../../theme-styled'

const StyledCard = styled(Card)`
  ${props => props.theme.card || ''}
`

const ThemedCard: React.FunctionComponent<CardProps> = (props) => {
  return <StyledCard {...props}>
    {props.children}
  </StyledCard>
}

export const CardContent = Card.Content
export const CardMeta = Card.Meta
export const CardHeader = Card.Header

export default ThemedCard
