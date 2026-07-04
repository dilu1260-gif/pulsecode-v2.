export default function Dashboard() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <div className="mb-12 text-center">

        <p className="text-blue-500 font-semibold">
          Workspace
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Everything in one dashboard.
        </h2>

        <p className="mt-5 text-zinc-400">
          Code, AI, deployments and analytics from one beautiful interface.
        </p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-zinc-800 p-6">
            <p className="text-zinc-400">Projects</p>
            <h3 className="mt-3 text-4xl font-bold">24</h3>
          </div>

          <div className="rounded-xl bg-zinc-800 p-6">
            <p className="text-zinc-400">AI Requests</p>
            <h3 className="mt-3 text-4xl font-bold">18.2K</h3>
          </div>

          <div className="rounded-xl bg-zinc-800 p-6">
            <p className="text-zinc-400">Deployments</p>
            <h3 className="mt-3 text-4xl font-bold">143</h3>
          </div>

        </div>

        <div className="mt-8 h-72 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center text-3xl font-bold">
          Dashboard Preview
        </div>

      </div>

    </section>
  );
}