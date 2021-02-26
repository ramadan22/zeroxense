import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
  body {
    overflow: ${props => (props.overflow ? props.overflow : "auto")};
    padding-right: ${props => (props.paddingRight ? props.paddingRight : "0px")};
  }
`

export default Style