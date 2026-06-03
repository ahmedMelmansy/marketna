import supabase from "../lib/supabase";

export async function getProfiles() {
    const { data, error } = await supabase
    .from("profiles")
    .select("*");
  
  if (error) throw new Error(error.message);

  return data;
}
export async function  addProfile(newProfile) {
    const {  error } = await supabase
    .from("profiles")
    .insert(newProfile)
    .single()
    if (error) throw new Error(error.message);

}
export async function deleteProfile(profileId) {
    const {  error } = await supabase
    .from("profiles")
    .delete(profileId)
    .single()
    if (error) throw new Error(error.message);

}
export async function updateProfile() {
    
}