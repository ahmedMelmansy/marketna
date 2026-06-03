import React from 'react'
import { getCategory, getProduct, getProductCategory } from '../../services/service'
import { getProductImages } from '@/app/services/apiProductImages'
import ProductDetails from '../../features/Products/ProductDetails'
import ProductsCategory from '../../features/Products/ProductsCategory'
export default async function Page({params}) {
    const {productId} = await params
    const product = await getProduct(productId)
    const images = await getProductImages(productId)
    const category_id = product.category_id
    const products = await getProductCategory(category_id)
    const category = await getCategory(category_id)
    const product_images = [
      ...images.map((img) => img.image_url),
    ]

    return (
    <div>
      <ProductDetails product={product} product_images ={product_images}/>
      <ProductsCategory products={ products} category={category}/>
    </div>
  )
}
