"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";


const StyledList = styled.li`
  a {
    display: flex;
    align-items: center;

    gap: 1.4rem;

    padding: 1.2rem 1.6rem;

    border-radius: 12px;

    transition: all 0.3s;

    color: var(--color-grey-900);
  }

  a:hover {
    background-color: var(--color-grey-0);
  }
  a.active {
    background-color: var(--color-brand-500);
  

  }

  a.active span {
    color: white;
  }
  span {
    font-size: 2.2rem;

    display: flex;
    align-items: center;

    color: var(--color-icon-0);
  }

  p {
    font-size: 1.7rem;
    font-weight: 500;

    text-transform: capitalize;
  }
  border-bottom:1px solid var(  --color-grey-0);
`;

export default function ListMainNav({to, icon , title}) {
    const pathname = usePathname();

  
  return (
     <StyledList
     >
      <Link href={to} className={pathname === to ? "active" : ""}>
      <span>{icon} </span>      
       <p>{title}</p>
      </Link>
     </StyledList>
  )
}
