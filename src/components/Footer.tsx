import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 mt-24">
      <div className="max-w-3xl mx-auto px-6 py-16 text-sm text-zinc-500">

        <p className="font-serif text-zinc-300 mb-2">
          Nilay Sharan
        </p>

        <p className="mb-6">
          Notes on systems, technology, and strategy.
        </p>

        <div className="flex flex-wrap gap-4 mb-6 text-zinc-400">
          <Link href="/essays" className="hover:text-zinc-200">Essays</Link>
          <Link href="/zettelkasten" className="hover:text-zinc-200">Zettelkasten</Link>
          <Link href="/archive" className="hover:text-zinc-200">Archives</Link>
          <Link href="/projects" className="hover:text-zinc-200">Projects</Link>
          <Link href="/about" className="hover:text-zinc-200">About</Link>
        </div>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()}
        </p>

      </div>
    </footer>
  );
}