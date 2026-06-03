import supabase, { supabaseUrl } from "../lib/supabase";


export async function getProductImages(productId) {
  console.log("productId:", productId, typeof productId);
  
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId);
  
  console.log("data:", data);
  console.log("error:", error);
  
  return data ?? [];
}
export async function getImages(){
    const { data } = await supabase
  .from("product_images")
  .select("*");
  return data
}