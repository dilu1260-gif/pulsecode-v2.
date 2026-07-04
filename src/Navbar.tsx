export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-blue-500">
          PulseCode
        </h1>

        <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
          <a href="#" className="hover:text-white">
            Features
          </a>

          <a href="#" className="hover:text-white">
            AI Agents
          </a>

          <a href="#" className="hover:text-white">
            Docs
          </a>

          <a href="#" className="hover:text-white">
            GitHub
          </a>
        </nav>

        <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700">
          Start Building
        </button>

      </div>
    </header>
  );
}