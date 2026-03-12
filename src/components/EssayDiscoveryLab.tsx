"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EssayCard = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  readMinutes: number;
};

type Props = {
  essays: EssayCard[];
};

function scoreEssay(
  essay: EssayCard,
  usedTags: Set<string>,
  currentTotal: number,
  targetMinutes: number,
  chaos: number,
) {
  const freshness = Math.max(
    0,
    1 - (Date.now() - new Date(essay.date).getTime()) / (1000 * 60 * 60 * 24 * 365 * 4),
  );

  const overlapCount = essay.tags.filter((tag) => usedTags.has(tag)).length;
  const novelty = essay.tags.length === 0 ? 1 : 1 - overlapCount / essay.tags.length;
  const pacingPenalty = Math.abs(targetMinutes - (currentTotal + essay.readMinutes)) / Math.max(targetMinutes, 1);

  return novelty * (1 + chaos * 0.4) + freshness * 0.6 - pacingPenalty * 0.8;
}

export default function EssayDiscoveryLab({ essays }: Props) {
  const [targetMinutes, setTargetMinutes] = useState(25);
  const [chaos, setChaos] = useState(4);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    essays.forEach((essay) => essay.tags.forEach((tag) => tags.add(tag)));
    return tags;
  }, [essays]);

  const route = useMemo(() => {
    if (!essays.length) return [];

    const sorted = [...essays].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const picked: EssayCard[] = [];
    const usedTags = new Set<string>();
    let total = 0;

    while (picked.length < 3 && picked.length < essays.length) {
      const candidates = sorted.filter((essay) => !picked.some((p) => p.slug === essay.slug));

      const best = candidates
        .map((essay) => ({
          essay,
          score:
            scoreEssay(essay, usedTags, total, targetMinutes, chaos) +
            (Math.sin(essay.slug.length * (chaos + 1)) + 1) * (chaos / 30),
        }))
        .sort((a, b) => b.score - a.score)[0]?.essay;

      if (!best) break;

      picked.push(best);
      total += best.readMinutes;
      best.tags.forEach((tag) => usedTags.add(tag));

      if (total >= targetMinutes * 1.25) break;
    }

    return picked;
  }, [chaos, essays, targetMinutes]);

  const routeMinutes = route.reduce((sum, essay) => sum + essay.readMinutes, 0);

  return (
    <section className="mb-24 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Discovery Lab</p>
        <h2 className="text-2xl text-zinc-100">Essay Constellation Mode</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">
          Pick your available time and chaos appetite, then this engine composes a high-signal
          reading route that balances freshness, thematic novelty, and pacing.
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <label className="block">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
            <span>Available minutes</span>
            <strong className="text-zinc-100">{targetMinutes} min</strong>
          </div>
          <input
            type="range"
            min={10}
            max={70}
            step={5}
            value={targetMinutes}
            onChange={(event) => setTargetMinutes(Number(event.target.value))}
            className="w-full accent-zinc-100"
          />
        </label>

        <label className="block">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
            <span>Chaos level</span>
            <strong className="text-zinc-100">{chaos}/10</strong>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={chaos}
            onChange={(event) => setChaos(Number(event.target.value))}
            className="w-full accent-zinc-100"
          />
        </label>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Route runtime</p>
          <p className="mt-2 text-xl text-zinc-100">~{routeMinutes} min</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Signal nodes</p>
          <p className="mt-2 text-xl text-zinc-100">{route.length} essays</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Tag galaxy</p>
          <p className="mt-2 text-xl text-zinc-100">{uniqueTags.size} themes</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {route.map((essay, index) => (
          <article key={essay.slug} className="rounded-xl border border-zinc-800 bg-black/20 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">Step {index + 1}</p>
            <Link
              href={`/essays/${essay.slug}`}
              className="text-lg leading-snug text-zinc-100 hover:underline"
            >
              {essay.title}
            </Link>
            {essay.description && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{essay.description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {essay.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500">≈ {essay.readMinutes} min read</p>
          </article>
        ))}
      </div>
    </section>
  );
}
