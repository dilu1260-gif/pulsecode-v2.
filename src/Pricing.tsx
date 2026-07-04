export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      features: [
        "100 AI Requests",
        "1 Project",
        "Community Support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      features: [
        "Unlimited AI",
        "Unlimited Projects",
        "Priority Support",
        "Team Workspace",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited Everything",
        "Dedicated AI",
        "Private Cloud",
        "24/7 Support",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <h2 className="mb-16 text-center text-4xl font-bold">
        Pricing
      </h2>

      <div className="grid gap-8 md:grid-cols-3">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-8 ${
              plan.highlight
                ? "border-blue-500 bg-blue-500/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <h3 className="text-2xl font-bold">
              {plan.name}
            </h3>

            <div className="mt-4 text-5xl font-bold">
              {plan.price}
            </div>

            <ul className="mt-8 space-y-3 text-zinc-300">
              {plan.features.map((feature) => (
                <li key={feature}>
                  ✅ {feature}
                </li>
              ))}
            </ul>

            <button className="mt-10 w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700">
              Get Started
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}