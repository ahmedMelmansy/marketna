
import supabase, { supabaseUrl } from "../lib/supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function addCategory(newCategory) {
  const imageName = `${Math.random()}-${newCategory.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/category-images/${imageName}`;

  // 1. Insert row
  const { data, error } = await supabase
    .from("categories")
    .insert([{ ...newCategory, image: imagePath }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("category-images")
    .upload(imageName, newCategory.image);

  if (storageError) {
    // Roll back the row
    await supabase.from("categories").delete().eq("id", data.id);
    throw new Error("Image upload failed — category was not created.");
  }

  return data;
}

// ── FIXED: was completely broken in the original ──────────────────────────────
export async function updateCategory({ id, updates }) {
  // If a new image File was provided, upload it first
  let imagePath = updates.image; // might already be a URL string (no change)

  if (updates.image instanceof File) {
    const imageName = `${Math.random()}-${updates.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/category-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("category-images")
      .upload(imageName, updates.image);

    if (storageError) throw new Error("Image upload failed.");
  }

  const { data, error } = await supabase
    .from("categories")
    .update({ ...updates, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
