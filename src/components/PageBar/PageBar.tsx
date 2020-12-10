import React from 'react'
import { Pagination } from 'semantic-ui-react'
import styled from 'styled-components'
import { PageInfo } from '../../definitions'
import RecordsSummary from '../RecordsSummary'

export interface PageBarProps extends Partial<PageInfo> {
  onPageInfoChange: ((pageInfo: PageInfo) => void) | undefined
  onRefreshClick?: () => void
  loading?: boolean
}

const SummaryContainer = styled.div`
  float: right;
  height: 40px;
`

const PageBar = (props: PageBarProps) => {
  return (
    <>
      {getPager(props)}
      <SummaryContainer>
        <RecordsSummary
          totalPages={props.totalPages ?? 1}
          activePage={props.page ?? 1}
          pageSize={props.pageSize ?? 0}
          totalRecords={props.totalRecords ?? 0}
          onRefreshClick={props.onRefreshClick}
          loading={props.loading}
        />
      </SummaryContainer>
    </>
  )
}

function getPager(props: PageBarProps) {
  if (!props.totalPages || props.totalPages <= 1) {
    return null
  }
  return (
    <Pagination
      pointing
      secondary
      totalPages={props.totalPages ?? 1}
      activePage={props.page ?? 1}
      onPageChange={(_event: any, data: any) => {
        if (!props.onPageInfoChange) return

        props.onPageInfoChange({
          page: data.activePage ?? 1,
          totalPages: data.totalPages ?? 1,
          pageSize: props.pageSize ?? 0,
          totalRecords: props.totalRecords ?? 0
        })
      }}
    />
  )
}

export default React.memo(PageBar)
