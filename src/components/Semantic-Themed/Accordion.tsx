import React from 'react'
import styled, { useTheme } from '../../theme-styled'
import { Accordion, AccordionProps } from 'semantic-ui-react'

const StyledAccordion = styled(Accordion)`
  ${props => props.theme.accordion || ''}

  .ui.accordion {
    .title {
      padding-left: 15px;
      padding-top: 0px;
      padding-bottom: 0px;
    }

    .title.active {
      padding-bottom: 10px;
    }

    .content.active {
      padding-top: 0px !important;
      padding-left: 15px !important;
      padding-bottom: 0px;
    }
  }
`

const ThemedAccordion = (props: AccordionProps) => {
  const theme = useTheme()

  return <StyledAccordion {...props} inverted={theme.invert}>
    {props.children}
  </StyledAccordion>
}

export default ThemedAccordion
