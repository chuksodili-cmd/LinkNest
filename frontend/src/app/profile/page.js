
"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  
useEffect(() => {
  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in first.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        "http://localhost:4000/api/profiles/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not load your profile.");
        return;
      }

      setUsername(data.profile.username);
      setDisplayName(data.profile.displayName);
      setBio(data.profile.bio || "");
      setAvatarUrl(data.profile.avatarUrl || "");

    } catch (error) {
      alert("Could not connect to the server.");
    }
  }

  fetchProfile();
}, []);


  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      window.location.href = "/login";
      return;
    }

    const response = await fetch(
      "http://localhost:4000/api/profiles/me",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          displayName,
          bio,
          avatarUrl,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not save your profile.");
      return;
    }

    alert("Profile updated successfully!");
  } catch (error) {
    alert("Could not connect to the server.");
  }
}

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="text-3xl font-bold text-cyan-400">
          Create Your Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Tell the world a little about yourself.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. miller"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Display Name
            </label>

            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Biography
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Profile Picture URL
            </label>

            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-400 py-3 font-bold text-slate-950 hover:bg-cyan-300"
          >
            Save Profile
          </button>

        </form>
      </div>
    </main>
  );
}
