import supabase, { supabaseUrl } from "../lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function addProduct(newProduct) {
  const { main_image,  extra_images ,...productData } = newProduct;

  // بناء imagePath
  const mainImageName  = `${Date.now()}-${main_image.name}`.replaceAll("/", "");
  const mainImagePath  = `${supabaseUrl}/storage/v1/object/public/product-images/main-image/${mainImageName}`;

  // 1. Insert الـ row (بدون main_image الـ File object)
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...productData, main_image:mainImagePath  }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { error: mainImageError } = await supabase.storage
    .from("product-images")
    .upload(`main-image/${mainImageName}`, main_image);

  if (mainImageError) {
    // Rollback
    await supabase.from("products").delete().eq("id", data.id);
    throw new Error("Image upload failed — product was not saved.");
  }
  if (extra_images?.length) {
    const imagesRows = [];

    for (const image of extra_images) {
      const imageName =
        `${Date.now()}-${image.name}`.replaceAll("/", "");

      const imagePath =
        `${supabaseUrl}/storage/v1/object/public/product-images/gallery/${imageName}`;

      // upload image
      const { error: uploadError } =
        await supabase.storage
          .from("product-images")
          .upload(`gallery/${imageName}`, image);

      if (uploadError) continue;

      imagesRows.push({
        product_id: data.id,
        image_url: imagePath,
      });
    }

    // insert rows
    if (imagesRows.length) {
      await supabase
        .from("product_images")
        .insert(imagesRows);
    }
  }
  return data;
}
// https://gqtqfkjowkacgqzvinoz.supabase.co/storage/v1/object/public/product-images/gallary/mohcen-cherifi-6wD_t5u3vlU-unsplash.jpg
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function editProduct({ product, id }) {
  let imagePath = product.main_image;

  if (product.main_image instanceof File) {
    const imageName =
      `${Date.now()}-${product.main_image.name}`.replaceAll("/", "");

    imagePath =
      `${supabaseUrl}/storage/v1/object/public/product-images/main-image/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("product-images")
      .upload(`main-image/${imageName}`, product.main_image);

    if (storageError) {
      throw new Error("Image upload failed.");
    }
  }

  // remove File object before update
      const {
      main_image,
      extra_images,
      ...productData
    } = product;

  // update product
  const { data, error } = await supabase
    .from("products")
    .update({
      ...productData,
      main_image: imagePath,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
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