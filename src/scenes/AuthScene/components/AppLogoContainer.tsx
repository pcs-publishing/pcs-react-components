import React from 'react'
import styled from '../../../theme-styled'

interface AppLogoContainerProps {
  logo: React.ReactElement
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  height: 100%;
`

const AppLogoContainer = (props: AppLogoContainerProps) => {
  return <Layout>
    <div>
      {props.logo}
    </div>
  </Layout>
}

export default AppLogoContainer
