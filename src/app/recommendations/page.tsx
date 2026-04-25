import Link from "next/link";
import { books, movies, type Book, type Movie } from "@/data/recommendations";

type LinkItem = {
  name: string;
  url?: string;
  description?: string;
};

type Section = {
  title: string;
  items: LinkItem[];
};

const sections: Section[] = [];

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-8 py-12">
      <header className="mb-24 max-w-2xl">
        <h1 className="text-4xl font-blackletter text-zinc-100 mb-4">
          Recommendations
        </h1>

        <p className="text-zinc-400 text-[15px] leading-relaxed">
          Things worth your time.
        </p>
      </header>

      {books.length > 0 && (
        <section className="mb-24">
          <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-10">
            Books
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
            {books.map((book) => (
              <li key={book.title} className="group">
                <BookCover book={book} />

                <div className="mt-4">
                  <p className="text-sm leading-snug text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    {book.title}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {movies.length > 0 && (
        <section className="mb-24">
          <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-10">
            Movies
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
            {movies.map((movie) => (
              <li key={movie.title} className="group">
                <MoviePoster movie={movie} />

                <div className="mt-4">
                  <p className="text-sm leading-snug text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    {movie.title}
                  </p>
                  {movie.year && (
                    <p className="mt-1 text-xs text-zinc-500">{movie.year}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-16 gap-y-16 my-32">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-8">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item) => (
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
      )}

      {books.length === 0 && movies.length === 0 && sections.length === 0 && (
        <p className="text-zinc-500 text-sm">Nothing here yet.</p>
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */

function BookCover({ book }: { book: Book }) {
  const inner = (
    <div
      className={[
        "relative aspect-[2/3] w-full overflow-hidden rounded-[3px]",
        "bg-zinc-900 ring-1 ring-zinc-800/80",
        // Soft drop shadow so the cover looks like it sits above the page.
        "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]",
        "transition-transform duration-300 ease-out",
        "group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.8)]",
      ].join(" ")}
    >
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Spine highlight — a thin gradient bar on the left edge that gives the
          cover a 3D "book on a shelf" feel without being heavy-handed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/40 via-black/15 to-transparent"
      />

      {/* Subtle inner highlight on the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
      />
    </div>
  );

  if (book.url) {
    return (
      <Link href={book.url} target="_blank" className="block no-underline">
        {inner}
      </Link>
    );
  }

  return inner;
}

function MoviePoster({ movie }: { movie: Movie }) {
  const inner = (
    <div
      className={[
        "relative aspect-[2/3] w-full overflow-hidden rounded-md",
        "bg-zinc-900 ring-1 ring-zinc-800/80",
        "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]",
        "transition-transform duration-300 ease-out",
        "group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.8)]",
      ].join(" ")}
    >
      <img
        src={movie.poster}
        alt={`Poster of ${movie.title}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );

  if (movie.url) {
    return (
      <Link href={movie.url} target="_blank" className="block no-underline">
        {inner}
      </Link>
    );
  }

  return inner;
}
