import React from 'react'
import { Calendar, OnChangeProps } from 'react-date-range'
import { Form } from 'semantic-ui-react'
import styled from '../../../theme-styled'

export interface SingleDatePickerProps {
  date: Date
  minDate?: Date
  maxDate?: Date
  onChange: (date: Date) => void
  label?: string
}

const StyledCalendar = styled(Calendar)`
    margin-top: 0px !important;
    width: 100%;
    max-width: 350px;
    ${(props) => props.theme.border};

    .rdrDayActive {
      border-color: ${props => props.theme.colors.primary} !important;
      outline-color: ${props => props.theme.colors.primary} !important;
      color: ${props => props.theme.colors.primary} !important;
    }

    .rdrSelected {
      background-color: ${props => props.theme.colors.primary} !important;
    }

    .rdrDayHovered {
      border-color: ${props => props.theme.colors.primary} !important;
      outline-color: ${props => props.theme.colors.primary} !important;
      color: ${props => props.theme.colors.primary} !important;
    }

    .rdrDayToday .rdrDayNumber span:after {
      background-color: ${props => props.theme.colors.primary};
    }
  `

const StyledFormField = styled(Form.Field)`
  line-height: 0.6em !important;
`

const SingleDatePicker = (props: SingleDatePickerProps) => {
  const handleChange = (date: OnChangeProps) => {
    props.onChange(date as Date)
  }

  return <StyledFormField>
    {props.label ? <label>{props.label}</label> : null}
    <StyledCalendar date={props.date} minDate={props.minDate} maxDate={props.maxDate} onChange={handleChange} />
  </StyledFormField>
}

export default SingleDatePicker
