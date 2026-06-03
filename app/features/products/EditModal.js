"use client";
import Modal from "@/app/components/GlobalModal";
import { CiEdit } from "react-icons/ci";
import styled from "styled-components";
import FormProduct from "./FormProduct";
import { useCategories } from "../categories/useCategories";

const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--color-grey-500);
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-brand-600);
    transform: scale(1.1);
  }
`;

export default function EditModal({ product,initialCategories }) {
  const{categories} =  useCategories(initialCategories)
  return (
    <Modal>
      <Modal.Open opens="edit-product">
        <EditButton>
          <CiEdit size={22} />
        </EditButton>
      </Modal.Open>

      <Modal.Window name="edit-product">
        <FormProduct product={product} categories={categories} />
      </Modal.Window>
    </Modal>
  );
}