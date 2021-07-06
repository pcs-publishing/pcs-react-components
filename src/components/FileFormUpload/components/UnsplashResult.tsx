import React from 'react'
import { Basic } from 'unsplash-js/dist/methods/photos/types'
import styled from '../../../theme-styled'
import { Image, Icon } from 'semantic-ui-react'
import _ from 'lodash'

const Container = styled.div`
  display: flex;
`

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ContentContainer = styled.div`
  flex: 2;
  margin-left: 5px;
`

const LikesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const UnsplashResult = (props: Basic) => {
  const maxDescriptionLength = 30

  const shortenDescription = (description: string) =>
    description.length <= maxDescriptionLength
      ? _.capitalize(description.substr(0, maxDescriptionLength))
      : _.capitalize(`${description.substr(0, maxDescriptionLength)}...`)

  return (
    <Container>
      <ImageContainer>
        <Image src={props.urls.small} size="tiny" />
        <LikesContainer>
          <Icon name="heart" color="red" />
          {props.likes.toLocaleString()}
        </LikesContainer>
      </ImageContainer>
      <ContentContainer>
        {shortenDescription(props.description ?? props.alt_description ?? '')}
      </ContentContainer>
    </Container>
  )
}

export default UnsplashResult
