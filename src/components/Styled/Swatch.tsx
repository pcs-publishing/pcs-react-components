import styled from '../../theme-styled'

export interface SwatchProps {
  color: string
  size?: number
  circle?: boolean
}

const DEFAULT_SIZE = 20

const Swatch = styled.div<SwatchProps>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.size ?? DEFAULT_SIZE}px;
  height: ${(props) => props.size ?? DEFAULT_SIZE}px;
  border-radius: ${(props) => (props.circle ? '50%' : '3px')};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

export default Swatch
