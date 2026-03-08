import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Controls from "./Controls";

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between px-6 md:px-8 py-6 font-sans">

        {/* Logo */}
        <Link
          href="/"
          className="font-blackletter text-2xl font-semibold tracking-[0.05em] text-zinc-100 hover:text-zinc-200 transition-colors"
        >
          Nil
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:block">
          <DesktopNav />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-6">
          <Controls />

          {/* Mobile nav */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;