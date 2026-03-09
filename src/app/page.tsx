"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
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
        Nilay Nath Sharan
      </motion.h1>

      {/* Intro */}
      <motion.p variants={item} className="mb-6">
        This website is a personal knowledge system. It is a place where
        ideas are captured as small notes, expanded into essays, and
        occasionally turned into working systems.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        Most ideas begin as fragments in the{" "}
        <Link
          href="/zettelkasten"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          Zettelkasten
        </Link>
        . These notes form a network of concepts — consensus, distributed
        systems, coordination, and failure. Over time some of them grow
        into longer pieces of writing.
      </motion.p>

      <motion.p variants={item} className="mb-6">
        Essays explore these ideas more deeply. For example,{" "}
        <Link
          href="/essays/attention-is-a-weapon"
          className="text-zinc-100 hover:text-white transition-colors"
        >
          Attention is a Weapon
        </Link>{" "}
        examines how technological systems compete for human attention.
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
          <Link href="/essays" className="hover:text-zinc-100 transition-colors">
            Essays
          </Link>{" "}
          — long-form explorations of ideas.
        </li>

        <li>
          <Link href="/zettelkasten" className="hover:text-zinc-100 transition-colors">
            Zettelkasten
          </Link>{" "}
          — a network of connected notes.
        </li>

        <li>
          <Link href="/projects" className="hover:text-zinc-100 transition-colors">
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
          <Link href="/zettelkasten/consensus" className="hover:text-zinc-100 transition-colors">
            Consensus
          </Link>
        </li>
        <li>
          <Link href="/zettelkasten/fault-tolerance" className="hover:text-zinc-100 transition-colors">
            Fault Tolerance
          </Link>
        </li>
        <li>
          <Link href="/zettelkasten/network-coordination" className="hover:text-zinc-100 transition-colors">
            Network Coordination
          </Link>
        </li>
      </motion.ul>

    </motion.main>
  );
}