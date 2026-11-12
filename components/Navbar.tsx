"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [loggedIn, setLoggedIn] =
    useState(false);

  const [email, setEmail] =
    useState("");

  useEffect(() => {

    async function loadSession() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (session?.user) {

        setLoggedIn(true);

        setEmail(
          session.user.email || ""
        );

      } else {

        setLoggedIn(false);

        setEmail("");

      }

    }

    loadSession();

  }, []);

  return (
    <nav className="bg-slate-900 text-white">

      <div className="flex items-center gap-6 px-6 py-4">

        <Link href="/">
          Dashboard
        </Link>

        <Link href="/kategorien">
          Kategorien
        </Link>

        <Link href="/haendler">
          Händler
        </Link>

        <Link href="/lebensmittel">
          Lebensmittel
        </Link>

        <Link href="/abos">
          Abos
        </Link>

        <Link href="/upload">
          Upload
        </Link>

        <Link href="/imports">
          OCR-Importe
        </Link>

        <div className="ml-auto flex items-center gap-4">

          {loggedIn && (
            <span className="text-sm text-slate-300">
              {email}
            </span>
          )}

          {loggedIn ? (

            <button
              onClick={async () => {

                await supabase.auth.signOut();

                window.location.href =
                  "/login";

              }}
              className="
                bg-red-600
                px-3
                py-1
                rounded
              "
            >
              Logout
            </button>

          ) : (

            <>
              <Link
                href="/login"
                className="
                  bg-blue-600
                  px-3
                  py-1
                  rounded
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  bg-green-600
                  px-3
                  py-1
                  rounded
                "
              >
                Registrieren
              </Link>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}