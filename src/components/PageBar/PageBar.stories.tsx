import React from 'react'
import PageBar from './PageBar'

export default {
  title: 'Page Bar',
  component: PageBar,
      argTypes: { onRefreshClick: { action: 'onRefreshClick' }, onPageInfoChange: { action: 'onPageInfoChange' }}
}

const Template = (props) => <PageBar {...props} /> 

export const Example = Template.bind({})

Example.args = {
  page: 1,
  pageSize: 10,
  totalPages: 12,
  totalRecords: 114,
  loading: false
}