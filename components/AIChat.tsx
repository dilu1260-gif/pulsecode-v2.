export default function AIChat() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <div className="grid items-center gap-14 lg:grid-cols-2">

        <div>
          <p className="mb-4 text-blue-500 font-semibold">
            AI Assistant
          </p>

          <h2 className="text-4xl font-bold">
            Your smartest coding partner.
          </h2>

          <p className="mt-6 text-zinc-400 leading-8">
            Ask questions, generate code, explain bugs,
            optimize performance and build complete
            applications using one intelligent assistant.
          </p>

          <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700">
            Try AI Chat
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

          <div className="mb-4 text-sm text-zinc-500">
            PulseCode AI
          </div>

          <div className="space-y-4">

            <div className="rounded-xl bg-zinc-800 p-4">
              Build a Next.js dashboard with authentication.
            </div>

            <div className="rounded-xl bg-blue-600 p-4">
              Sure! I'll generate the entire project,
              authentication, database, dashboard and deployment.
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}