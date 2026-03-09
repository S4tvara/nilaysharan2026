"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
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
        This website is a personal knowledge system. It exists to collect,
        explore, and connect ideas over time. Instead of publishing isolated
        posts, the goal is to build a map of thinking that grows gradually.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        Most ideas begin as small notes in the{" "}
        <Link
          href="/zettelkasten"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          Zettelkasten
        </Link>
        . These notes capture individual concepts, references, or questions.
        Over time they become connected to other notes, forming a network of
        related ideas.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        Some of these notes eventually grow into longer pieces of writing.
        The{" "}
        <Link
          href="/essays"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          essays
        </Link>{" "}
        section contains more structured explorations of ideas that have
        developed enough to stand on their own.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        Occasionally ideas turn into working systems. The{" "}
        <Link
          href="/projects"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          projects
        </Link>{" "}
        section documents software and experiments built while exploring these
        concepts.
      </motion.p>

      <motion.p variants={item} className="mb-10">
        The site therefore has three layers: notes, writing, and systems.
        Together they form a record of how ideas evolve over time.
      </motion.p>

      <motion.h2
        variants={item}
        className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4"
      >
        About the Author
      </motion.h2>

      <motion.p variants={item} className="mb-6">
        I’m Nilay Sharan, an engineer interested in distributed systems,
        technology, and the structure of complex ideas. This site is where I
        think in public — recording questions, experiments, and fragments of
        understanding as they develop.
      </motion.p>

      <motion.p variants={item}>
        If you’re interested in the ideas themselves, start with the{" "}
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