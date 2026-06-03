import { FiHeart } from "react-icons/fi";
import styled from "styled-components";
const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  background: white;
  border-radius: 16px;
  text-align: center;
  border: 1px dashed #e5e7eb;

  svg {
    font-size: 4rem;
    color: #d1d5db;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    color: #374151;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.4rem;
    color: #9ca3af;
  }
`;
export default function EmptyState() {
  return (
          <Empty>
            <FiHeart />
            <h2>No favorites yet</h2>
            <p>Items you love will appear here. Start exploring!</p>
          </Empty>
  )
}
