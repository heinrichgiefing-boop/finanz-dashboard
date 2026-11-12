"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function register() {

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Benutzer angelegt"
    );

  }

  return (
    <main className="max-w-md mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Registrierung
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
        onClick={register}
        className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded
        "
      >
        Registrieren
      </button>

    </main>
  );
}