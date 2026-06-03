"use client";


import { useCallback, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/app/services/apiCategories";
import { ModalProvider } from "@/app/components/Modal";
import CategoryGrid from "@/app/features/categories/CategoryGrid";
import CategoryModal from "@/app/features/categories/CategoryModal";
import HeaderSections from "@/app/ui/HeaderSections";
import { useCategories } from "@/app/features/categories/useCategories";

export default function CategoriesClient({ initialCategories }) {
const{categories =[] , isLoading} = useCategories(initialCategories)

  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = useCallback(() => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCategory(null), 280);
  }, []);

  return (

    <ModalProvider>
      <HeaderSections onAddClick={openAddModal} 
      title='Taxonomy categories'
      description='Build inventory hierarchies, map count, and group listed details'
      type='Add category'
      />

      <CategoryGrid
        categories={categories}
        onEdit={openEditModal}
      />

      <CategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={closeModal}
      />
    </ModalProvider>
  );
}