import React from 'react'
import RecordsSummary from './RecordsSummary';

export default {
  title: 'Records Summary',
  component: RecordsSummary,
  argTypes: { onRefreshClick: { action: 'onRefreshClick' }}
}

const Template = (props) => <RecordsSummary {...props} />


export const Example = Template.bind({})

Example.args = {
  totalRecords: 150,
  totalPages: 15,
  activePage: 1,
  pageSize: 10,
  loading: false
}
