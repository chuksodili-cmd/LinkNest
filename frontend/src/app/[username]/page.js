
"use client";

import { useEffect, useState } from "react";

export default function PublicProfile({ params }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { username } = await params;

        const response = await fetch(
          `http://localhost:4000/api/profiles/public/${encodeURIComponent(username)}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Profile not found.");
          return;
        }

        setProfile(data.profile);
      } catch (err) {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading profile...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-lg text-center">

        <div className="mb-6 flex justify-center">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="h-28 w-28 rounded-full border-4 border-cyan-400 object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-cyan-400 bg-slate-800 text-4xl font-bold text-cyan-400">
              {profile.displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-cyan-400">
          {profile.displayName}
        </h1>

        <p className="mt-2 text-slate-400">
          @{profile.username}
        </p>

        <p className="mt-4 text-slate-300">
          {profile.bio}
        </p>

        <div className="mt-10 space-y-4">
          {profile.links.length === 0 ? (
            <p className="text-slate-500">
              No active links available yet.
            </p>
          ) : (
            profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-slate-700 bg-slate-900 p-4 font-semibold transition hover:border-cyan-400 hover:bg-slate-800"
              >
                {link.title}
              </a>
            ))
          )}
        </div>

        <p className="mt-12 text-sm text-slate-600">
          Powered by LinkNest
        </p>

      </div>
    </main>
  );
}
