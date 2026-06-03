"use client";   

import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import RealModal from '@/app/components/RealModal';

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1.6rem;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: #f1f5f9;
    transform: scale(1.1);
  }
`;

export default function EditModal({ children }) {
  return (
    <RealModal>
      <RealModal.Open opens="view-order">
        <ActionButton>
          <MdEdit />
        </ActionButton>
      </RealModal.Open>

      <RealModal.Window name="view-order">
        {children}
      </RealModal.Window>
    </RealModal>
  );
}