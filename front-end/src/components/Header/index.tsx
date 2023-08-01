import { HeaderContainer } from './styles'

import logoLorem from '../../assets/react.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoLorem} alt="" />
      <span>LoremIpsum Clients</span>
    </HeaderContainer>
  )
}
