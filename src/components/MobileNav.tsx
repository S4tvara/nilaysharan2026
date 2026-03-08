"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./NavLinks";
import { Menu, X } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="text-zinc-200"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute left-0 top-20 w-full bg-black border-t border-zinc-800 flex flex-col items-center gap-8 py-10 text-xs uppercase tracking-widest text-zinc-400">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition-colors ${
                  active ? "text-zinc-100" : "hover:text-zinc-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MobileNav;