import React from 'react'
import { IParticlesParams } from 'react-particles-js'

export interface AppInfo {
  appName: string
  appLogo: (large: boolean) => React.ReactElement
}

export const AppInfoContext = React.createContext<{ appInfo: AppInfo }>({
  appInfo: {
    appName: '',
    appLogo: () => <div></div>
  }
})

export interface AppInfoProviderProps {
  appInfo: AppInfo
}

export const AppInfoProvider: React.FunctionComponent<AppInfoProviderProps> = (props) => {
  return <AppInfoContext.Provider value={{ appInfo: props.appInfo }}>
    {props.children}
  </AppInfoContext.Provider>
}
