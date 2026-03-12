import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Controls from "./Controls";
import { getSearchIndex } from "@/lib/search-index";

const Navbar = () => {
  const searchItems = getSearchIndex();

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between px-6 md:px-8 py-6 font-sans">
        <Link
          href="/"
          className="font-blackletter text-2xl font-semibold tracking-[0.05em] text-zinc-100 hover:text-zinc-200 transition-colors"
        >
          s4tvara
        </Link>

        <div className="hidden md:block">
          <DesktopNav />
        </div>

        <div className="flex items-center gap-6">
          <Controls searchItems={searchItems} />

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
