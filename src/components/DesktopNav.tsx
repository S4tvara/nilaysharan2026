"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./NavLinks";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8 md:gap-12 text-xs uppercase tracking-widest text-zinc-400 font-semibold" >
      {links.map((link) => {
        const active = pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`transition-colors ${
              active ? "text-zinc-100 font-extrabold" : "hover:text-zinc-200"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopNav;