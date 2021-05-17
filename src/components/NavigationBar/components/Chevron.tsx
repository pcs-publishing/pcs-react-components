import React from 'react'
import styled from '../../../theme-styled'
import { Icon } from 'semantic-ui-react'

const FloatRightIcon = styled(Icon)`
  float: right;
`

const Chevron = () => {
  return <FloatRightIcon name='angle right' />
}

export default Chevron
