"use client";

import {
  categoryLabels,
  type Vocab,
  type Frequency,
} from "@/data/vocabulary";

type Props = {
  vocab: Vocab;
};

const FREQ_LABEL_KO: Record<Frequency, string> = {
  high: "자주",
  mid: "가끔",
  low: "드물게",
};

export function VocabCard({ vocab }: Props) {
  const { word, meaning, category, frequency, description } = vocab;
  return (
    <article className="rounded-2xl border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-line-strong md:px-6 md:py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[20px] font-bold leading-snug tracking-tighter text-ink-900 md:text-[22px]">
            {word}
          </h3>
          <p className="mt-0.5 text-[15px] font-medium leading-snug tracking-tight text-ink-500 md:text-[15.5px]">
            {meaning}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <CategoryBadge category={category} />
          <FrequencyBadge frequency={frequency} />
        </div>
      </div>

      {description && (
        <p className="mt-3 border-t border-line pt-3 text-[13.5px] font-normal leading-relaxed tracking-tight text-ink-400 md:text-sm">
          {description}
        </p>
      )}
    </article>
  );
}

function CategoryBadge({ category }: { category: keyof typeof categoryLabels }) {
  return (
    <span className="whitespace-nowrap rounded-md bg-line px-2 py-1 text-[11px] font-semibold text-ink-500">
      {categoryLabels[category]}
    </span>
  );
}

function FrequencyBadge({ frequency }: { frequency: Frequency }) {
  const styles: Record<Frequency, string> = {
    high: "bg-brand-50 text-brand-600",
    mid: "bg-warn-50 text-warn-500",
    low: "bg-line text-ink-400",
  };
  return (
    <span
      className={`whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold ${styles[frequency]}`}
    >
      {FREQ_LABEL_KO[frequency]}
    </span>
  );
}
