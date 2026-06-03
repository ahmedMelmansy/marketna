import supabase from "@/app/lib/supabase";

export async function createOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single()

  

  if (error) throw error;

  return data;
}
export async function createOrderItems(orderItems){
  const { data, error } =  await supabase
  .from("order_items")
  .insert(orderItems)
  .select()
  if (error) throw error;

}

export async function getProductCategory(categoryId) {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    throw new Error(error.message);
  }

  return products;
}

export async function getCategory(categoryId) {
    
    let { data: products, error } = await supabase
    .from('categories')
    .select("*")
    .eq('id',categoryId)
    .single()
    
    if(error){
        throw new Error(error)
    }
    
    return products
}
export async function getProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    if (error) {
      throw new Error(error.message);
    }

  return products;
}

export async function getProduct(productId) {
    
    let { data: product, error } = await supabase
    .from('products')
    .select("*")
    .eq('id', productId)
    .single()

    if(error){ 
        throw new Error(error)
    }

    
    return product
}
export async function updateProduct(id, newProduct) {
  const { data, error } = await supabase
    .from("products")
    .update(newProduct)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getProductImages(productId) {
    
    let { data: images , error } = await supabase
    .from('product_images')
    .select("image_url")
    .eq('product_id', productId)
  

    if(error){ 
        throw new Error(error)
    }

    
    return images
}
