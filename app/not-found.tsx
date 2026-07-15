export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white">
          404
        </h1>

        <p className="mt-6 text-lg text-zinc-300">
          We couldn't find that page.
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          It may have been moved or deleted.
        </p>

        <a
          href="/"
          className="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}