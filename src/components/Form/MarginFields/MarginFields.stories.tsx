import React, { useState } from 'react'
import { Margin } from '../../../definitions'
import styled from '../../../theme-styled'
import MarginFields from './MarginFields'
import { Form } from 'semantic-ui-react'


export default {
  title: 'Form/Margin Fields',
  component: MarginFields,
}


const Container = styled.div`
  padding: 30px;
  width: 800px;
`

const Template = () => {
  const [value, setValue] = useState<Margin>({ top: 0, bottom: 0, inside: 0, outside: 0 })

  return <Container>
    <Form>
      <MarginFields value={value} onChange={setValue} />
    </Form>
  </Container>
}

export const Example = Template.bind({})
