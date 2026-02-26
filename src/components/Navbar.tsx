"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [username, setUsername] = useState<string>("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();
        if (profile) setUsername(profile.username);
      }
    }
    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          🍄 Mushroom Finder
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-green-200">
            Map & Search
          </Link>

          {user ? (
            <>
              <span className="text-green-200">
                {username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-green-700 px-3 py-1 rounded hover:bg-green-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
