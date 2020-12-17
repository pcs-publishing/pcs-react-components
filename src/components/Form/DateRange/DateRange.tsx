import React, { useCallback } from 'react'
import { DateRange } from 'react-date-range'
import useTheme from '../../../hooks/useTheme'
import styled from '../../../theme-styled'
import { Form, Button } from 'semantic-ui-react'
import { startOfDay, endOfDay } from 'date-fns'
import { isValidDate } from '../../../util/date'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangeOptions, DateRangeProps } from '.'

const StyledDateRange = styled(DateRange)`
  width: 100%;
  max-width: 350px;
  ${(props) => props.theme.border};
`

const StyledClearButton = styled(Button)`
  margin-bottom: 10px !important;
`

interface DateRangeValue {
  startDate: Date | null
  endDate: Date | null
  key: string
}

const DateRangeFilter = (props: DateRangeProps) => {
  const propsValue = props.value as DateRangeOptions | undefined
  const RANGE_KEY = 'selection'

  const dateRange: DateRangeValue = {
    startDate: propsValue?.start ? startOfDay(propsValue.start) : null,
    endDate: propsValue?.end ? endOfDay(propsValue.end) : null,
    key: RANGE_KEY
  }

  const theme = useTheme()

  const { onChange } = props

  const clearDates = useCallback(() => {
    onChange(undefined)
  }, [onChange])

  const onDateChange = useCallback(
    (ranges) => {
      let { startDate: startRaw, endDate: endRaw } = ranges[RANGE_KEY]

      let start: Date | null = null
      let end: Date | null = null

      if (!isValidDate(endRaw)) {
        endRaw = startRaw
      }

      if (startRaw && endRaw) {
        start = startOfDay(startRaw)
        end = endOfDay(endRaw)
      }

      onChange(
        start && end ? { start, end } : undefined
      )
    },
    [onChange]
  )

  return (
    <Form.Field>
      <label>{props.label || 'Date Range'}</label>
      {dateRange?.startDate && dateRange?.endDate ? (
        <div>
          <StyledClearButton
            size="tiny"
            compact
            basic
            icon="remove"
            color="red"
            onClick={clearDates}
            content="Clear Selected Date Range"
            />
          </div>
      ) : null}
      <StyledDateRange
        ranges={[dateRange]}
        onChange={onDateChange}
        weekStartsOn={1}
        moveRangeOnFirstSelection
        rangeColors={[theme.colors.primary]}
      />
    </Form.Field>
  )
}

export default DateRangeFilter
