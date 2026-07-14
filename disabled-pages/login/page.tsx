"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black text-white">
      <h1 className="text-3xl font-bold">Login</h1>

      <input
        className="text-black p-2 rounded"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="text-black p-2 rounded"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-blue-600 px-6 py-2 rounded"
      >
        Login
      </button>
    </main>
  );
}