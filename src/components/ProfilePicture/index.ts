import ProfilePicture from './ProfilePicture'

export interface ProfilePictureProps {
  firstname: string
  surname: string
  size: number
  showName?: boolean
  avatar?: string
  className?: string
  onClick?: () => void
  customIndicator?: React.FunctionComponentElement
}

export default ProfilePicture
