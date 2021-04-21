import React from 'react'

interface AppInfo {
  appName: string
  appLogo: string
}

const AppInfoContext = React.createContext<AppInfo>({
  appName: 'Unknown Application',
  appLogo: ''
})

function AppInfoProvider() {
  
}


export default { AppInfoContext, AppInfoProvider }
