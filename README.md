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

This example demonstrates how to use one of the many components available within the pcs-react-components library, to see examples and demos of all the components available visit: https://pcs-publishing.github.io/pcs-react-components

## Contributing Guidelines

* All components must be application agnostic and contain no references or mentions to applications that they're being used in.
* All components must have an accompanying `stories` file, that demonstrates its functionality.
* All components must be functional components and not use the old class based approach.
* Components should be as dumb as possible, in that they hold as little state and logic as possible and are instead controlled via their props.

