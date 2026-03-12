import Link from "next/link";

type FooterLink = {
  name: string;
  href: string;
};

const exploreLinks: FooterLink[] = [
  { name: "Essays", href: "/essays" },
  { name: "Zettelkasten", href: "/zettelkasten" },
  { name: "Archives", href: "/archive" },
  { name: "Projects", href: "/projects" },
];

const navigateLinks: FooterLink[] = [
  { name: "Links", href: "/links" },
  { name: "About", href: "/about" },
  { name: "Home", href: "/" },
];

const linkClassName =
  "group inline-flex no-underline text-zinc-300 hover:text-zinc-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm";

const motionClassName =
  "inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1";

export default function Footer() {
  const buildStatus = process.env.NODE_ENV === "production" ? "live" : "dev";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 w-full border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <section>
            <h2 className="mb-4 font-sans text-[11px] uppercase tracking-[0.26em] text-zinc-500">
              Explore
            </h2>
            <ul className="space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    <span className={motionClassName}>
                      <span className="text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400 group-focus-visible:text-zinc-300">
                        -&gt;
                      </span>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-sans text-[11px] uppercase tracking-[0.26em] text-zinc-500">
              Navigate
            </h2>
            <ul className="space-y-3 text-sm">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    <span className={motionClassName}>
                      <span className="text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400 group-focus-visible:text-zinc-300">
                        -&gt;
                      </span>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-sans text-[11px] uppercase tracking-[0.26em] text-zinc-500">
              Utility
            </h2>
            <div className="space-y-4 text-sm text-zinc-300">
              <a href="#top" className={linkClassName}>
                <span className={motionClassName}>
                  <span className="text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400 group-focus-visible:text-zinc-300">
                    -&gt;
                  </span>
                  Back to top
                </span>
              </a>
              <p className="font-mono text-xs text-zinc-500">
                Quick find: Ctrl/Command + K
              </p>
              <p className="font-mono text-xs text-zinc-500">
                Reader: A- / A+ / night shift
              </p>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
