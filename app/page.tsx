"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  vocabulary,
  categoryLabels,
  frequencyLabels,
  type Category,
  type Frequency,
} from "@/data/vocabulary";
import { SearchBar } from "@/components/SearchBar";
import { ChipRow } from "@/components/ChipRow";
import { VocabCard } from "@/components/VocabCard";

const CATEGORY_KEYS = Object.keys(categoryLabels) as Category[];
const FREQ_KEYS = Object.keys(frequencyLabels) as Frequency[];
const PAGE_SIZE = 30;

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeFrequencies, setActiveFrequencies] = useState<Set<Frequency>>(
    new Set(FREQ_KEYS),
  );
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(CATEGORY_KEYS),
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vocabulary.filter((v) => {
      if (activeCategories.size > 0 && !activeCategories.has(v.category))
        return false;
      if (activeFrequencies.size > 0 && !activeFrequencies.has(v.frequency))
        return false;
      if (!q) return true;
      return (
        v.word.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        (v.description?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, activeCategories, activeFrequencies]);

  const toggle = <T,>(set: Set<T>, value: T) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const hasActiveFilters =
    activeCategories.size !== CATEGORY_KEYS.length ||
    activeFrequencies.size !== FREQ_KEYS.length ||
    query.length > 0;

  const clearAll = () => {
    setActiveCategories(new Set(CATEGORY_KEYS));
    setActiveFrequencies(new Set(FREQ_KEYS));
    setQuery("");
  };

  // Count helpers for chips
  const catCount = (c: Category) =>
    vocabulary.filter((v) => v.category === c).length;
  const freqCount = (f: Frequency) =>
    vocabulary.filter((v) => v.frequency === f).length;

  // Infinite scroll
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeCategories, activeFrequencies]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (visibleCount >= filtered.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length, visibleCount]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-8 md:px-6 md:pt-12">
      {/* ===== Header ===== */}
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-bold leading-tight tracking-tighter text-ink-900 md:text-[30px]">
            개발 영단어<span className="text-brand-500">.</span>
          </h1>
          <p className="mt-1.5 text-[13px] font-medium text-ink-300 md:text-sm">
            {vocabulary.length}개 단어 · 12개 카테고리 · 3단계 빈도
          </p>
        </div>
        <a
          href="https://github.com/limEnough/dev-voca"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-line transition-colors hover:bg-line-strong"
          aria-label="GitHub"
        >
          <svg
            className="h-[18px] w-[18px] text-ink-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
      </header>

      {/* ===== Search ===== */}
      <SearchBar value={query} onChange={setQuery} />

      {/* ===== Frequency chips ===== */}
      <div className="mt-5">
        <ChipRow label="노출 빈도">
          {FREQ_KEYS.map((f) => (
            <Chip
              key={f}
              active={activeFrequencies.has(f)}
              onClick={() => setActiveFrequencies((prev) => toggle(prev, f))}
              label={frequencyLabels[f]}
              count={freqCount(f)}
            />
          ))}
        </ChipRow>
      </div>

      {/* ===== Category chips ===== */}
      <div className="mt-4 overflow-hidden">
        <ChipRow label="카테고리">
          {CATEGORY_KEYS.map((c) => (
            <Chip
              key={c}
              active={activeCategories.has(c)}
              onClick={() => setActiveCategories((prev) => toggle(prev, c))}
              label={categoryLabels[c]}
              count={catCount(c)}
            />
          ))}
        </ChipRow>
      </div>

      {/* ===== Result row ===== */}
      <div className="mt-6 flex items-center justify-between px-0.5">
        <span className="text-[13px] font-medium text-ink-300">
          검색 결과 {filtered.length.toLocaleString()}건
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-[13px] font-semibold text-brand-500 hover:text-brand-600"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* ===== Cards ===== */}
      <section className="mt-3 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-surface px-6 py-16 text-center">
            <p className="text-base font-semibold text-ink-700">
              검색 결과가 없어요
            </p>
            <p className="mt-1.5 text-sm font-medium text-ink-300">
              다른 키워드로 검색하거나 필터를 초기화해보세요
            </p>
          </div>
        ) : (
          <>
            {visibleItems.map((v, i) => (
              <VocabCard key={`${v.word}-${i}`} vocab={v} />
            ))}
            {hasMore && (
              <div
                ref={sentinelRef}
                className="flex items-center justify-center py-6 text-[13px] font-medium text-ink-300"
              >
                불러오는 중…
              </div>
            )}
          </>
        )}
      </section>

      {/* ===== Footer ===== */}
      <footer className="mt-16 flex items-center justify-between text-[12px] font-medium text-ink-300">
        <span>개발 영단어 · Dev Voca</span>
        <span>Made with Next.js</span>
      </footer>
    </main>
  );
}

// Inline chip for cleaner JSX
function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-line-strong bg-surface text-ink-500 hover:border-ink-200"
      }`}
    >
      {label}
      <span
        className={`ml-1 font-medium ${
          active ? "text-white/80" : "text-ink-300"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
