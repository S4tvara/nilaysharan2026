"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Page() {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-2xl px-6 py-20 leading-relaxed text-zinc-300"
    >
      {/* Title */}
      <motion.h1
        variants={item}
        className="text-3xl font-blackletter text-zinc-100 mb-8"
      >
        Satvara
      </motion.h1>

      {/* Intro */}
      <motion.p variants={item} className="mb-6">
        This website is a trap to capture ideas, a place where thoughts can be
        collected, explored, and connected over time. Instead of publishing
        isolated posts, the goal is find commanility between different ideas and
        build a network which grows and evolves with me.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        Most ideas begin as fragments in the{" "}
        <Link
          href="/archive"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          archive
        </Link>
        . Some of which are developed further into{" "}
        <Link href="/zettelkasten">zettelkasten</Link>. Which are then connected
        together to form a web, and patterns begin to emerge. Certain themes and
        clusters of ideas become apparent, and{" "}
        <Link href="/essays">Essays</Link> explore these clusters of theme more
        deeply.
      </motion.p>

      <motion.p variants={item} className="mb-10">
        Sometimes ideas become software. Projects like{" "}
        <Link
          href="/projects/octoguard"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          Octoguard
        </Link>{" "}
        and{" "}
        <Link
          href="/projects/sietch"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          Sietch
        </Link>{" "}
        emerge from the same exploration of systems and infrastructure.
      </motion.p>

      {/* Sections */}
      <motion.h2
        variants={item}
        className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4"
      >
        Sections
      </motion.h2>

      <motion.ul variants={item} className="space-y-2 mb-10">
        <li>
          <Link
            href="/essays"
            className="hover:text-zinc-100 transition-colors"
          >
            Essays
          </Link>{" "}
          — long-form explorations of ideas.
        </li>

        <li>
          <Link
            href="/archive"
            className="hover:text-zinc-100 transition-colors"
          >
            Archive
          </Link>{" "}
          — a blurb of ideas.
        </li>

        <li>
          <Link
            href="/zettelkasten"
            className="hover:text-zinc-100 transition-colors"
          >
            Zettelkasten
          </Link>{" "}
          — a network of connected notes.
        </li>

        <li>
          <Link
            href="/projects"
            className="hover:text-zinc-100 transition-colors"
          >
            Projects
          </Link>{" "}
          — systems built while exploring ideas.
        </li>
      </motion.ul>

      {/* Recent */}
      <motion.h2
        variants={item}
        className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4"
      >
        Recent Notes
      </motion.h2>

      <motion.ul variants={item} className="space-y-1">
        <li>
          <Link
            href="/zettelkasten/consensus"
            className="hover:text-zinc-100 transition-colors"
          >
            Consensus
          </Link>
        </li>
        <li>
          <Link
            href="/zettelkasten/fault-tolerance"
            className="hover:text-zinc-100 transition-colors"
          >
            Fault Tolerance
          </Link>
        </li>
        <li>
          <Link
            href="/zettelkasten/network-coordination"
            className="hover:text-zinc-100 transition-colors"
          >
            Network Coordination
          </Link>
        </li>
      </motion.ul>
    </motion.main>
  );
}
