import TableProducts from "@/app/features/products/TableProducts";
import ProductClient from "./ProductClient";
import { getProducts } from "@/app/services/apiProducts";
import { useCategories } from "@/app/features/categories/useCategories";
import { getCategories } from "@/app/services/apiCategories";

export default  async function ProductsPage() {
  
  const initialProducts = await getProducts()
  const initialCategories = await getCategories()
  return (
    <ProductClient initialProducts={initialProducts} initialCategories={initialCategories}/>
  
  );
}