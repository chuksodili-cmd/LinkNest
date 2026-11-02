
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Log out the user
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // Get information about the logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please log in first.");
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Could not load your account.");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        setUser(data.user);
      } catch (error) {
        alert("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          LinkNest.
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
        >
          Log Out
        </button>
      </nav>

      {/* Dashboard Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        {loading ? (
          <h2 className="text-3xl font-bold">
            Loading your dashboard...
          </h2>
        ) : (
          <h2 className="text-3xl font-bold">
            Welcome, {user?.name}!
          </h2>
        )}

        <p className="mt-2 text-slate-400">
          Manage your profile and all your important links in one place.
        </p>

        {/* Dashboard Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* My Profile Card */}
          <Link
            href="/profile"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400"
          >
            <h3 className="text-xl font-bold text-cyan-400">
              My Profile
            </h3>

            <p className="mt-3 text-slate-400">
              Create and manage your personal LinkNest profile.
            </p>
          </Link>

          {/* My Links Card */}
          <Link
            href="/links"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400"
          >
            <h3 className="text-xl font-bold text-cyan-400">
              My Links
            </h3>

            <p className="mt-3 text-slate-400">
              Add, edit, and delete your social media links.
            </p>
          </Link>

          {/* Public Page Card */}
          <Link
            href="/miller"
            target="_blank"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400"
          >
            <h3 className="text-xl font-bold text-cyan-400">
              Public Page
            </h3>

            <p className="mt-3 text-slate-400">
              Share your personal page with the world.
            </p>
          </Link>

        </div>
      </section>
    </main>
  );
}
