export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-zinc-400">
          Welcome back to PulseCode.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700">
          + New Project
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
          D
        </div>
      </div>
    </header>
  );
}