import Link from "next/link";

type Project = {
  name: string;
  description: string;
  type: string;
  year: number;
  stack: string[];
  architecture?: string;
  context?: string;
  repo?: string;
};

type Idea = {
  title: string;
  description: string;
  projects: Project[];
};

const ideas: Idea[] = [
  {
    title: "Distributed Systems",
    description:
      "Understanding coordination, replication, and failure across unreliable networks.",
    projects: [
      {
        name: "Sietch",
        description:
          "Decentralized encrypted vaults that synchronize across LAN, sneakernet, and unreliable networks.",
        type: "system",
        year: 2025,
        stack: ["Golang", "P2P", "Encryption"],
        architecture: "vault → sync engine → peer discovery",
        context:
          "Experiment exploring resilient synchronization in disconnected environments.",
        repo: "https://github.com/S4tvara/Sietch",
      },
      {
        name: "Octoguard",
        description:
          "Monitoring framework for detecting anomalies across distributed infrastructure.",
        type: "system",
        year: 2025,
        stack: ["Go", "Redis", "Docker"],
        architecture: "agents → queue → analyzer → dashboard",
        context:
          "Built while experimenting with observability in distributed clusters.",
      },
    ],
  },
  {
    title: "Systems Programming",
    description:
      "Low-level experiments with infrastructure and networking software.",
    projects: [
      {
        name: "Sundara-K",
        description: "Minimal web framework written entirely in C.",
        type: "framework",
        year: 2024,
        stack: ["C", "HTTP", "POSIX"],
        architecture: "router → middleware → handler",
        context:
          "Exploration of building web infrastructure without modern runtime abstractions.",
        repo: "https://github.com/S4tvara/Sundara-K",
      },
    ],
  },
  {
    title: "Communication Systems",
    description:
      "Systems exploring how information moves across constrained environments.",
    projects: [
      {
        name: "MedBud",
        description:
          "Messaging system designed for rapid communication in emergency situations.",
        type: "system",
        year: 2024,
        stack: ["Node", "WebSockets", "React"],
        architecture: "client → relay → broadcast",
        context:
          "Experiment in building resilient communication tools for crisis coordination.",
        repo: "https://github.com/S4tvara/MedBud",
      },
    ],
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-8 py-12">
      {/* Header */}
      <header className="mb-24 max-w-2xl">
        <h1 className="text-4xl font-blackletter text-zinc-100 mb-4">
          Projects
        </h1>
        <p className="text-zinc-400 text-[15px] leading-relaxed">
          Systems built while exploring ideas in computing.
        </p>
      </header>

      {/* Idea Sections */}
      <div className="space-y-28">
        {ideas.map((idea) => (
          <section key={idea.title}>
            <h2 className="text-xl text-zinc-100 mb-3">{idea.title}</h2>

            <p className="text-sm text-zinc-400 mb-10 max-w-2xl">
              {idea.description}
            </p>

            <div className="space-y-16">
              {idea.projects.map((project) => (
                <div
                  key={project.name}
                  className="grid grid-cols-[220px_1fr] gap-x-12"
                >
                  {/* LEFT COLUMN */}
                  <div className="text-sm">
                    <div className="text-zinc-100 font-medium mb-2">
                      {project.repo ? (
                        <Link href={project.repo} className="hover:underline">
                          {project.name}
                        </Link>
                      ) : (
                        project.name
                      )}
                    </div>

                    <div className="text-zinc-500 text-xs space-y-1">
                      <div>type: {project.type}</div>
                      <div>year: {project.year}</div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div>
                    <p className="text-zinc-300 text-[15px] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {project.context && (
                      <div className="mb-3">
                        <div className="text-xs text-zinc-500 mb-1">
                          context
                        </div>
                        <div className="text-sm text-zinc-400">
                          {project.context}
                        </div>
                      </div>
                    )}

                    {project.architecture && (
                      <div className="mb-3">
                        <div className="text-xs text-zinc-500 mb-1">
                          architecture
                        </div>
                        <div className="text-sm text-zinc-400 font-mono">
                          {project.architecture}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">stack</div>
                      <div className="text-sm text-zinc-400">
                        {project.stack.join(" · ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}