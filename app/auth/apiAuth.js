import supabase from "../lib/supabase";

export async function signUp(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}
export async function signIn(email,password) {
  return await supabase.auth.signInWithPassword({
  email,
  password,
});
}

export async function logout() {
  return await supabase.auth.signOut();
}