import styled from '../../theme-styled'

const Box = styled.div`
  ${props => props.theme.border}
  ${props => props.theme.backgrounds.offset}
  
  flex-basis: auto;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #eee;
`

export default Box
