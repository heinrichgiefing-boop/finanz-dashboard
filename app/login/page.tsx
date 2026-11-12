"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function login() {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
    }
  }

  return (

    <main className="max-w-md mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="E-Mail"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        className="border p-2 w-full mb-4"
        placeholder="Passwort"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={login}
        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded
        "
      >
        Login
      </button>

    </main>

  );

}