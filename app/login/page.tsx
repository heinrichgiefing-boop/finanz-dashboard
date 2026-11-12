"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function login() {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      window.location.href = "/";

    } catch (err) {

      console.error(err);

      alert(
        "Fehler beim Login"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            p-2
            mb-4
            rounded
          "
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            p-2
            mb-6
            rounded
          "
        />

        <button
          onClick={login}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            text-white
            py-2
            rounded
          "
        >
          {loading
            ? "Anmeldung..."
            : "Login"}
        </button>

      </div>

    </main>
  );
}