import DateRange from './DateRange'

export interface DateRangeOptions {
  start: Date
  end: Date
}

export interface DateRangeProps {
  label?: string
  value: DateRangeOptions | undefined
  onChange: (value: DateRangeOptions | undefined) => void
}

export default DateRange