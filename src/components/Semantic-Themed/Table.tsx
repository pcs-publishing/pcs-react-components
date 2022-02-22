import React from 'react'
import styled, { useTheme } from '../../theme-styled'
import { Table, TableProps } from 'semantic-ui-react'

const StyledTable = styled(Table)`
  ${props => props.theme.table || ''}
`

const ThemedTable = (props: TableProps) => {
  const theme = useTheme()
  return <StyledTable inverted={theme.invert} {...props}>
    {props.children}
  </StyledTable>
}

export const TableRow = Table.Row
export const TableCell = Table.Cell
export const TableBody = Table.Body
export const TableHeader = Table.Header
export const TableHeaderCell = Table.HeaderCell
export const TableFooter = Table.Footer

export default ThemedTable
