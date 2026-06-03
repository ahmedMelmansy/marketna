"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // 🔥 مهم جدًا

    if (!user) {
      router.push("/login");
      return;
    }

    // 🔥 أهم تعديل هنا
    if (role === null || role === undefined) return;

    if (role !== "admin") {
      router.push("/");
      return;
    }
  }, [user, role, loading, router]);




  return children;
}