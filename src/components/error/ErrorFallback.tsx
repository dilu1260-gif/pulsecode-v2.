"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorFallback({
  error,
  reset,
}: Props) {
  async function copyError() {
    await navigator.clipboard.writeText(
      error.stack ?? error.message
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-8">
      <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">

        <h1 className="text-2xl font-bold text-white">
          ⚠️ PulseCode crashed
        </h1>

        <p className="mt-3 text-zinc-400">
          An unexpected error occurred.
        </p>

        <pre className="mt-6 max-h-56 overflow-auto rounded bg-black p-4 text-xs text-red-400">
{error.message}
        </pre>

        <div className="mt-6 flex gap-3">

          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Reload
          </button>

          <button
            onClick={copyError}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-white hover:bg-zinc-800"
          >
            Copy Error
          </button>

        </div>
      </div>
    </div>
  );
}