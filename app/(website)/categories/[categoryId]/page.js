import { useAuth } from "@/app/context/AuthContext";
import ProductsCategory from "../../features/Products/ProductsCategory";
import { getCategory, getProductCategory } from "../../services/service";
import EmptyPage from "../../websiteComponent/EmptyPage";

export default async function Page({ params }) {
    const{categoryId} = await params
    const products = await getProductCategory(categoryId)
    const category =await getCategory(categoryId)
    

  return( 
    <div>
        <ProductsCategory products={products} category={category}/>
    </div>
  );
}