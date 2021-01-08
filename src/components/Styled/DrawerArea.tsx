import styled from '../../theme-styled';

export default styled.div`
  ${props => props.theme.border}
  ${props => props.theme.backgrounds.offsetEmphasis};
  padding: 8px;
`