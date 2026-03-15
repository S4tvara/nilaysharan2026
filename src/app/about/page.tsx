"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Page() {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-2xl px-6 py-20 text-zinc-300 leading-relaxed"
    >
      <motion.h1
        variants={item}
        className="text-3xl font-blackletter text-zinc-100 mb-8"
      >
        About
      </motion.h1>

      <motion.p variants={item} className="mb-6">
        Memories are fleeting, and so are ideas. The events and thoughts that
        shape our lives often fade into the haze of time. This project is an
        attempt to capture those fragments before they disappear, a place to
        record ideas, reflect on them, and let them evolve.
      </motion.p>

      <motion.h2
        variants={item}
        className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4"
      >
        About the Author
      </motion.h2>

      <motion.p variants={item} className="mb-6">
        I&apos;m in my early twenties and have worked, at different points,
        across tech, writing, finance, and a few areas that are better left
        undisclosed.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        The idea for this project came from a quiet street across the railway
        tracks. It was so deserted that dust had settled over the road. A broken
        lamp flickered intermittently, briefly illuminating the drifting
        particles in the air. It felt like a place forgotten by time.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        That image stayed with me. It reminded me how easily memories fade and
        how much of a person&apos;s thinking disappears if it is never written
        down. This space exists to prevent that, a place to capture thoughts
        before they vanish.
      </motion.p>

      <motion.p variants={item}>
        If you&apos;re interested in the ideas themselves, start with the{" "}
        <Link
          href="/zettelkasten"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          notes
        </Link>{" "}
        or explore the{" "}
        <Link
          href="/essays"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          essays
        </Link>
        .
      </motion.p>
    </motion.main>
  );
}
