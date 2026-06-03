"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  useEffect(() => {
    // 1. get current session
    async function getUser() {
    
        const { data } = await supabase.auth.getUser();
    
      if (data?.user) {
        setUser(data.user);

        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();
        console.log("USER:", data?.user);
        console.log("PROFILE:", profile);
        setRole(profile?.role || "user");
        }
    
        setUser(data?.user || null);
    
        setLoading(false);
    
    }

    getUser();

    // 2. listen for changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading ,role }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook جاهز للاستخدام
export function useAuth() {
  return useContext(AuthContext);
}