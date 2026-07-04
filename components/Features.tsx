export default function Features() {
  const features = [
    {
      title: "AI Code Generation",
      desc: "Generate production-ready code in seconds."
    },
    {
      title: "AI Debugging",
      desc: "Find and fix bugs instantly with AI."
    },
    {
      title: "Deploy Anywhere",
      desc: "Deploy to Vercel, AWS and Docker."
    },
    {
      title: "Team Collaboration",
      desc: "Work together in real time."
    },
    {
      title: "AI Chat",
      desc: "Talk to your entire codebase."
    },
    {
      title: "Smart Refactoring",
      desc: "Improve your code automatically."
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <h2 className="mb-14 text-center text-4xl font-bold">
        Everything developers need
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-blue-500 hover:scale-105"
          >
            <h3 className="mb-3 text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-zinc-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}