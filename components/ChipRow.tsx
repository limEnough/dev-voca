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
      <div className="chip-row-wrap">
        <div className="chip-row flex gap-2 overflow-x-auto pb-1">
          {children}
        </div>
      </div>
    </div>
  );
}
