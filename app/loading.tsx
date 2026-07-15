export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500" />

        <p className="mt-6 text-zinc-400">
          Loading PulseCode...
        </p>
      </div>
    </main>
  );
}