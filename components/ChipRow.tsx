type Props = {
  label: string;
  children: React.ReactNode;
};

export function ChipRow({ label, children }: Props) {
  return (
    <div>
      <div className="mb-2 px-0.5 text-[12px] font-semibold text-ink-300">
        {label}
      </div>
      <div className="chip-row -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-6 md:px-6">
        {children}
      </div>
    </div>
  );
}
