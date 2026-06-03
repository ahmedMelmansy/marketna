"use client"
import Modal from "@/app/components/GlobalModal";
import { useCategories } from "@/app/features/categories/useCategories";
import FormProduct from "@/app/features/products/FormProduct";
import ProductView from "@/app/features/products/ProductView";
import TableProducts from "@/app/features/products/TableProducts";
import { useProducts } from "@/app/features/products/useProducts";
import { getCategories } from "@/app/services/apiCategories";
import styled from "styled-components";
const HeaderContainer = styled.div`
  border-bottom: 1px solid var(--color-grey-100);
  padding: 2.4rem 3rem;
  background-color: var(--color-grey-0);
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }
`;

const TextGroup = styled.div`
  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--color-grey-900);
    margin: 0;
    letter-spacing: -0.6px;
  }
  p {
    font-size: 1.45rem;
    color: var(--color-grey-500);
    margin-top: 0.6rem;
    line-height: 1.5;
  }
`;

const AddButton = styled.button`
  background: var(--color-brand-600);
  color: white;
  padding: 1.1rem 2.4rem;
  border: none;
  border-radius: 12px;
  font-size: 1.45rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-brand-700);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;
export default function ProductClient({initialProducts, initialCategories}) {

  const {categories} = useCategories(initialCategories)
  const {products} = useProducts(initialProducts)
    
  return (
    <div>
          <div>
            <HeaderContainer>
              <MainHeader>
                <TextGroup>
                  <h1>Products Catalog</h1>
                  <p>Manage all your products and inventory in one place</p>
                </TextGroup>
      
                <Modal>
                  <Modal.Open opens="add-product">
                    <AddButton>
                      <span>+</span> Add New Product
                    </AddButton>
                  </Modal.Open>
      
                  <Modal.Window name="add-product">
                    <FormProduct categories={categories}/>
                  </Modal.Window>
                </Modal>
              </MainHeader>
            </HeaderContainer>
      
             <TableProducts products={products} initialCategories={initialCategories}  />
             
          </div>
    </div>
  )
}
