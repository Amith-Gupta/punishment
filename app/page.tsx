"use client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthScreen } from "@/components/auth-screen";
import { AppShell } from "@/components/app-shell";
import { ToastProvider, Spinner } from "@/components/ui";

const DEFAULT_DEMO_SESSION: Session = {
  access_token: "demo-jwt-token-local",
  token_type: "bearer",
  expires_in: 86400 * 30,
  refresh_token: "demo-refresh-token",
  user: {
    id: "user-demo-kumar",
    app_metadata: {},
    user_metadata: { full_name: "Rajesh Kumar Sharma" },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: "demo.kumar.family@example.com",
  },
};

export default function Home() {
  const [session, setSession] = useState<Session | null | undefined>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("copilot_auth_session");
        if (raw === "SIGNED_OUT") return null;
        if (raw) return JSON.parse(raw);
        localStorage.setItem("copilot_auth_session", JSON.stringify(DEFAULT_DEMO_SESSION));
      } catch {}
    }
    return DEFAULT_DEMO_SESSION;
  });

  useEffect(() => {
    supabase()
      .auth.getSession()
      .then(({ data }) => {
        if (data.session) {
          setSession(data.session);
        }
      });
    const { data } = supabase().auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <ToastProvider>
      {session ? (
        <AppShell email={session.user.email || "demo.kumar.family@example.com"} />
      ) : (
        <AuthScreen />
      )}
    </ToastProvider>
  );
}
