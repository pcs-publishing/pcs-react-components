import React, { useState } from 'react'
import Alert, { AlertProps } from './Alert'
import { Button } from 'semantic-ui-react'

export default {
  title: 'Popups/Alert',
  component: Alert
}

const Template = (args: Omit<AlertProps, 'close' | 'open'>) => {
   const [showAlert, setShowAlert] = useState(false)
    return <>
      <Button onClick={() => setShowAlert(true)}>Open Alert</Button>
      <Alert
          {...args}
        close={() => setShowAlert(false)}
        open={showAlert}
      />
    </>

}

export const Example = Template.bind({})

Example.args = {
  title: 'Alert Header',
  message: 'This is the alert message text'
}



