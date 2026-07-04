export default function Workspace() {
  return (
    <main className="flex-1 bg-black p-8 text-white">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h2 className="text-3xl font-bold">
          Welcome to PulseCode 🚀
        </h2>

        <p className="mt-4 max-w-2xl text-zinc-400">
          This workspace will become the heart of PulseCode.
          Here you'll create projects, chat with AI, edit code,
          review files, and deploy applications.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="font-semibold">📁 Projects</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Manage all your projects.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="font-semibold">🤖 AI Chat</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Build software with AI.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="font-semibold">🚀 Deploy</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Publish your apps instantly.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}