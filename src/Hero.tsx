export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

      <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
        🚀 AI Software Engineer
      </span>

      <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
        Build software
        <br />
        <span className="text-blue-500">
          at the speed of thought.
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-zinc-400">
        PulseCode is your AI engineering team.
        Plan, generate, debug and deploy software
        from one intelligent workspace.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700">
          Start Building
        </button>

        <button className="rounded-xl border border-zinc-700 px-8 py-4 hover:border-blue-500">
          View Demo
        </button>
      </div>

    </section>
  );
}