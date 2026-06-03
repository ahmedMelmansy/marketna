import React from 'react'
import styled from 'styled-components'

const SideBarStyled = styled.aside`
  background-color: var(--color-brand-0);
  margin-top: 20rem;
  padding: 0 4rem;
`;

export default function SideBar({children}) {
  return (
    <SideBarStyled>
      {children}
    </SideBarStyled>
  )
}