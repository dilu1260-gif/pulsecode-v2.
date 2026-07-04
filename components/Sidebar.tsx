export default function Sidebar() {
  const menu = [
    "🏠 Dashboard",
    "📁 Projects",
    "🤖 AI Chat",
    "📦 Templates",
    "🚀 Deployments",
    "⚙️ Settings",
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-blue-500">
          PulseCode
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          AI Software Engineer
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menu.map((item) => (
          <button
            key={item}
            className="mb-2 w-full rounded-xl px-4 py-3 text-left text-zinc-300 transition hover:bg-blue-600 hover:text-white"
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-500">
            Signed in as
          </p>

          <p className="mt-1 font-semibold">
            Dilawar
          </p>
        </div>
      </div>
    </aside>
  );
}