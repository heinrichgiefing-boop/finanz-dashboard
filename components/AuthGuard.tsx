"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading, setLoading] =
    useState(true);

  const [authenticated,
    setAuthenticated] =
    useState(false);

  useEffect(() => {

    async function check() {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthenticated(
        !!session
      );

      setLoading(false);

    }

    check();

  }, []);

  if (loading) {
    return <div>Lädt...</div>;
  }

  if (!authenticated) {
    window.location.href =
      "/login";

    return null;
  }

  return <>{children}</>;

}