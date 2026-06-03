import supabase from "../lib/supabase";


export async function getOrderItemId(id) {
  const { data, error } =  await supabase
  .from("order_items")
  .select("*")
  .eq("order_id",id)
  
  if (error) throw error;
  return data
}