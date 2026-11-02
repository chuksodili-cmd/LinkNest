
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          LinkNest.
        </h1>

        <div className="flex gap-4">
          <a
            href="/login"
            className="rounded-lg px-5 py-2 text-white hover:text-cyan-400"
          >
            Log in
          </a>

          <a
            href="/register"
            className="rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
          Your digital space, all in one place
        </span>

        <h2 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
          One link.
          <span className="text-cyan-400"> Endless </span>
          possibilities.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Bring all your important links together.
          Share your creativity, grow your audience,
          and let the world discover everything about you.
        </p>

        <a
          href="/register"
          className="mt-10 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
        >
          Create Your LinkNest →
        </a>
      </section>

      {/* Features */}
      <section className="grid gap-6 px-8 pb-20 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h3 className="text-xl font-bold text-cyan-400">
            All Your Links
          </h3>
          <p className="mt-3 text-slate-400">
            Keep your social media, websites, and
            favourite destinations in one place.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h3 className="text-xl font-bold text-cyan-400">
            Your Identity
          </h3>
          <p className="mt-3 text-slate-400">
            Create a personal profile that represents
            who you are and what you do.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h3 className="text-xl font-bold text-cyan-400">
            Easy to Share
          </h3>
          <p className="mt-3 text-slate-400">
            Share one simple link and connect people
            to everything you create.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        © 2026 LinkNest. All rights reserved.
      </footer>
    </main>
  );
}
