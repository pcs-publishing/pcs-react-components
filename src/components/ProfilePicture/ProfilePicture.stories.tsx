import React from 'react'
import faker from 'faker'
import ProfilePicture, { ProfilePictureProps } from '.'
import styled from 'styled-components'

export default {
  title: 'Profile Picture',
  component: ProfilePicture,
  argTypes: { onClick: { action: 'click' } }
}

const Container = styled.div`
  width: 200px;
`

const Template = (props: ProfilePictureProps) => (
  <Container><ProfilePicture {...props} /></Container>
)

export const NoPicture = Template.bind({})
NoPicture.args = {
  firstname: faker.name.firstName(),
  surname: faker.name.lastName(),
  size: 200,
  showName: false
}

export const WithPicture = Template.bind({})
WithPicture.args = {
  firstname: 'Christopher',
  surname: 'Train',
  avatar: '/avatar.png',
  size: 200,
  showName: false
}

export const WithName = Template.bind({})
WithName.args = {
  firstname: 'Christopher',
  surname: 'Train',
  avatar: '/avatar.png',
  size: 200,
  showName: true
}

const size = 200
const indicatorSize = 30

const StatusIndicator = styled.div`
  position: relative;
  bottom: ${(size * 0.8) + indicatorSize}px;
  left: ${(size * 0.8)}px;
  width: ${indicatorSize}px;
  height: ${indicatorSize}px;
  border-radius: 50%;
  background-color: #2ecc71;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`

export const WithCustomIndicator = Template.bind({})
WithCustomIndicator.args = {
  firstname: 'Christopher',
  surname: 'Train',
  avatar: '/avatar.png',
  size: 200,
  showName: false,
  customIndicator: <StatusIndicator />
}
