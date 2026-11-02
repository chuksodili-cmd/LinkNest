
"use client";

import { useEffect, useState } from "react";

export default function Links() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load saved links when the page opens
  useEffect(() => {
    async function fetchLinks() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/links",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Could not load your links.");
          return;
        }

        setLinks(data.links);
      } catch (error) {
        alert("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  // Add a new link
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
        "http://localhost:4000/api/links",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not add your link.");
        return;
      }

      setLinks((currentLinks) => [
        ...currentLinks,
        data.link,
      ]);

      setTitle("");
      setUrl("");

      alert("Link added successfully!");
    } catch (error) {
      alert("Could not connect to the server.");
    }
  }

  // Delete a link
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this link?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/api/links/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not delete link.");
        return;
      }

      setLinks((currentLinks) =>
        currentLinks.filter((link) => link.id !== id)
      );

      alert("Link deleted successfully!");
    } catch (error) {
      alert("Could not connect to the server.");
    }
  }

  // Activate or deactivate a link
  async function handleToggle(link) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/api/links/${link.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isActive: !link.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not update link.");
        return;
      }

      setLinks((currentLinks) =>
        currentLinks.map((item) =>
          item.id === link.id ? data.link : item
        )
      );
    } catch (error) {
      alert("Could not connect to the server.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-bold text-cyan-400">
          My Links
        </h1>

        <p className="mt-2 text-slate-400">
          Add and manage your important links.
        </p>

        {/* Add Link Form */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-xl font-bold">
            Add a New Link
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm">
                Link Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Instagram"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Link URL
              </label>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://instagram.com/yourname"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-400 py-3 font-bold text-slate-950 hover:bg-cyan-300"
            >
              Add Link
            </button>

          </form>
        </div>

        {/* Saved Links */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-xl font-bold">
            Your Saved Links
          </h2>

          {loading ? (
            <p className="mt-4 text-slate-400">
              Loading your links...
            </p>
          ) : links.length === 0 ? (
            <p className="mt-4 text-slate-400">
              You haven't added any links yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">

              {links.map((link) => (
                <div
                  key={link.id}
                  className="rounded-lg border border-slate-700 bg-slate-950 p-5"
                >

                  <h3 className="font-bold text-cyan-400">
                    {link.title}
                  </h3>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block break-all text-sm text-slate-400 hover:text-cyan-400"
                  >
                    {link.url}
                  </a>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={() => handleToggle(link)}
                      className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
                    >
                      {link.isActive ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(link.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-500"
                    >
                      Delete
                    </button>

                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Status: {link.isActive ? "Active" : "Inactive"}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}
