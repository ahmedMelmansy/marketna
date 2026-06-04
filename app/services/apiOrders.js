import supabase from "../lib/supabase";

export async function getOrders({ status, sortBy } = {}) {
  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (sortBy && sortBy !== "all") {
    const [field, direction] = sortBy.split("-");
    query = query.order(field, { ascending: direction === "desc" });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId);

  if (error) throw error;
  return data;
}

export async function updateOrder(orderId, newStatus) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}