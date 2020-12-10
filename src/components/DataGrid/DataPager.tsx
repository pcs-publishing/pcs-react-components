import React from 'react'
import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import PageBar from '../PageBar'
import { PageInfo } from '../../definitions'

export interface DataPagerProps {
  pageInfo?: PageInfo
  onPageInfoChange?: (pageInfo: PageInfo) => void
  onRefreshClick?: () => void
  loading?: boolean
}

const BottomBarCell = styled(Table.HeaderCell)`
  padding: 3px !important;
  height: 50px !important;
`

const DataPager = (props: DataPagerProps) => {
  if (!props.pageInfo) return null
  return (
    <Table.Footer>
      <Table.Row>
        <BottomBarCell colSpan="1">
          <PageBar
            {...props.pageInfo}
            onPageInfoChange={props.onPageInfoChange}
            onRefreshClick={props.onRefreshClick}
            loading={props.loading}
          />
        </BottomBarCell>
      </Table.Row>
    </Table.Footer>
  )
}

export default React.memo(DataPager)
