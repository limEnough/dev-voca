"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3.5">
      <svg
        className="h-5 w-5 shrink-0 text-ink-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3-3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="단어, 뜻으로 검색"
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent text-base font-medium text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="검색어 지우기"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-100 text-white hover:bg-ink-200"
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
