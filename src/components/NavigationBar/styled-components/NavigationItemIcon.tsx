import styled from '../../../theme-styled'
import { Icon } from 'semantic-ui-react'
import MenuContentCss from './MenuContentCss'

export default styled(Icon) <{ $active: boolean }>`
  ${MenuContentCss}

  float: left !important;
  margin-right: 15px !important;
`