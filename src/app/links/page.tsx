import Link from "next/link";

type LinkItem = {
  name: string;
  url?: string;
  description?: string;
};

type Column = {
  title: string;
  items: LinkItem[];
};

const columns: Column[] = [
  {
    title: "Writing",
    items: [
      {
        name: "Gwern",
        url: "https://gwern.net",
        description: "Long-form research essays on technology and culture.",
      },
      {
        name: "Paul Graham",
        url: "https://paulgraham.com/articles.html",
        description: "Essays on startups and independent thinking.",
      },
      {
        name: "Bret Victor",
        url: "https://worrydream.com",
        description: "Research exploring the future of computing.",
      },
      {
        name: "Venkatesh Rao",
        url: "https://www.ribbonfarm.com",
        description: "Writing on systems thinking and strategy.",
      },
    ],
  },
  {
    title: "Systems",
    items: [
      {
        name: "Dan Luu",
        url: "https://danluu.com",
        description: "Essays on distributed systems and computing history.",
      },
      {
        name: "High Scalability",
        url: "http://highscalability.com",
        description: "Architecture breakdowns of large systems.",
      },
      {
        name: "Architecture of Open Source Applications",
        url: "https://aosabook.org",
        description: "Deep dives into how real systems are designed.",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Neovim", url: "https://neovim.io" },
      { name: "Git", url: "https://git-scm.com" },
      { name: "Docker", url: "https://docker.com" },
      { name: "Obsidian", url: "https://obsidian.md" },
    ],
  },
  {
    title: "Places",
    items: [
      { name: "Dynamicland", url: "https://dynamicland.org" },
      { name: "Internet Archive", url: "https://archive.org" },
      { name: "Bell Labs", url: "https://www.bell-labs.com" },
    ],
  },
];

const books = [
  "Gödel, Escher, Bach",
  "Structure and Interpretation of Computer Programs",
  "The Beginning of Infinity",
  "Designing Data-Intensive Applications",
  "The Pragmatic Programmer",
  "The Mythical Man-Month",
  "The Cathedral and the Bazaar",
  "Hackers and Painters",
  "Clean Architecture",
  "Algorithms to Live By",
];

const movies = [
  "2001: A Space Odyssey",
  "The Social Network",
  "Blade Runner 2049",
  "Ex Machina",
  "Arrival",
  "The Matrix",
  "Her",
  "Interstellar",
];

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-8 py-12">
      {/* Header */}
      <header className="mb-24 max-w-2xl">
        <h1 className="text-4xl font-blackletter text-zinc-100 mb-4">Links</h1>

        <p className="text-zinc-400 text-[15px] leading-relaxed">
          Writers, systems, tools, books, and media that influence how I think.
        </p>
      </header>

      {/* Books */}
      <section className="mb-24">
        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-10">
          Books
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
          {books.map((book) => (
            <div
              key={book}
              className="text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {book}
            </div>
          ))}
        </div>
      </section>

      {/* Movies */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-10">
          Movies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
          {movies.map((movie) => (
            <div
              key={movie}
              className="text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {movie}
            </div>
          ))}
        </div>
      </section>

      {/* Reference Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-16 gap-y-16 my-32 ">
        {columns.map((column) => (
          <section key={column.title}>
            <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-8">
              {column.title}
            </h2>

            <div className="space-y-4">
              {column.items.map((item) => (
                <div key={item.name}>
                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      className="text-zinc-100 hover:underline"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-zinc-100">{item.name}</span>
                  )}

                  {item.description && (
                    <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
