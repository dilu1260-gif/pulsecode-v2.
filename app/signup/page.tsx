"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Check your email.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black text-white">
      <h1 className="text-3xl font-bold">Create Account</h1>

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
        onClick={signUp}
        className="bg-blue-600 px-6 py-2 rounded"
      >
        Sign Up
      </button>
    </main>
  );
}