import React, { ReactElement } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

export interface RecordsSummaryProps {
  totalRecords: number
  totalPages: number
  activePage: number
  pageSize: number
  onRefreshClick?: () => void
  loading?: boolean
}

const Container = styled.div`
  display: table;
  height: 100%;
  padding: 5px;
  color: #999;
`

const Text = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const Highlight = styled.span`
  font-weight: bold;
`

const RefreshButtonContainer = styled.div`
  margin-left: 5px;
`

const RefreshButton = styled(Icon)`
  cursor: pointer;
`

const RecordsSummary = (props: RecordsSummaryProps) => {
  const totalRecords = props.totalRecords ?? 0
  const start = Math.min(
    props.pageSize * (props.activePage - 1) + 1 ?? 0,
    totalRecords
  )
  const end = Math.min(start - 1 + props.pageSize ?? 20, totalRecords)
  return (
    <Container>
      <Text>
        Viewing <Highlight>{start}</Highlight> to <Highlight>{end}</Highlight>{' '}
        of <Highlight>{props.totalRecords}</Highlight> total records
      </Text>
      {props.onRefreshClick ? (
        <Text>{getRefreshButton(props.onRefreshClick, !!props.loading)}</Text>
      ) : null}
    </Container>
  )
}

function getRefreshButton(
  onRefreshClick: () => void,
  loading: boolean
): ReactElement {
  return (
    <RefreshButtonContainer>
      <RefreshButton
        name="refresh"
        loading={loading}
        size="large"
        onClick={onRefreshClick}
      />
    </RefreshButtonContainer>
  )
}

export default RecordsSummary
