# PCS-React-Components

## Installation

To install through npm run the following:

```bash
npm install @pcs/react-components
```

## Usage

To use a component from the component library, import and use it like so (example shown here is the `HtmlPreview` component).

```typescript
  import React, { useState } from 'react'
  import { Input } from 'semantic-ui-react'
  import { HtmlPreview } from '@pcs/react-components'

  const App = () => {
    const [html, setHtml] = useState('<h2>Heading Example</h2>')

    return <>
      <Input placeholder="Set HTML" onChange={(e) => setHtml(e.target.value)} />
      <HtmlPreview html={html} />
    </>
  }

  export default App
```

This example demonstrates how to use one of the many components available within the pcs-react-components library, to see examples and demos of all the components available visit: http://react-components.dev.presscomputer.systems
