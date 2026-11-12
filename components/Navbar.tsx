"use client";

import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4">

      <div className="flex gap-6">

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
      </div>
      
      <button
        onClick={async () => {

          await supabase.auth.signOut();

          window.location.href =
            "/login";

        }}
        className="
          ml-auto
          bg-red-600
          px-3
          py-1
          rounded
        "
      >
        Logout
      </button>
    </nav>
  );
}
