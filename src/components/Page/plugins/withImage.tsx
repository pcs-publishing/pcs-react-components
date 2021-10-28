import React from 'react'
import { PageProps } from '../Page'

const withImage: <T extends PageProps>(
  Page: React.FunctionComponent<T>
) => React.FunctionComponent<
  T & {
    url: string
  }
> = (Page) => (props) => {
  return (
    <Page {...props}>
      <image
        width="100%"
        height="100%"
        href={props.url}
        preserveAspectRatio="none"
      />
      {props.children}
    </Page>
  )
}

export default withImage
