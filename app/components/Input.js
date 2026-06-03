import styled from "styled-components"

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var( --color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.6rem;
  color: var(--color-silver-700);
  font-size: 1rem;


  @media (max-width: 1700px) { 
    width: 100%;
  }
    @media (max-width: 1000) { 

      width: fit-content;
      }
  

`
export default Input