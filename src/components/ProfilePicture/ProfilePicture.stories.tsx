import React from 'react'
import faker from 'faker'
import ProfilePicture, { ProfilePictureProps } from '.'

export default {
  title: 'Profile Picture',
  component: ProfilePicture,
  argTypes: { onClick: { action: 'click' } }
}

const Template = (props: ProfilePictureProps) => (
  <ProfilePicture {...props} />
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
