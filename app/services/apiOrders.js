import supabase from "../lib/supabase";

export async function getOrders() {
  const { data, error } = await supabase
  .from("orders")
  .select("*");
  
  if (error) throw new Error(error.message);
  return data;
}
export async function updateOrder(newStatus,id) {
  const { error } =  await supabase
  .from("orders")
  .update({ status: newStatus })
  .eq("id", id);
  
  if (error) throw new Error(error.message);
  
}