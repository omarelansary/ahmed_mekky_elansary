"use client";

type Props = {
  tags: string[];
  selected?: string | null;
  onSelect?: (tag: string | null) => void;
  locale?: "ar" | "en";
  className?: string;
};

export default function TagPills({ tags, selected = null, onSelect, locale = "en", className = "" }: Props) {
  const unique = Array.from(new Set(tags)).filter(Boolean);
  const allLabel = locale === "en" ? "All" : "الكل";
  const isInteractive = typeof onSelect === "function";

  return (
    <div className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}> 
      {isInteractive && (
        <button
          type="button"
          onClick={() => onSelect?.(null)}
          className={
            [
              "text-xs rounded-full [padding-inline:0.5rem] py-1 border",
              selected == null
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10",
            ].join(" ")
          }
        >
          {allLabel}
        </button>
      )}
      {unique.map((t) => {
        const pill = (
          <span
            className={
              [
                "text-xs rounded-full [padding-inline:0.5rem] py-1 border",
                selected === t
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                  : "border-black/10 dark:border-white/20",
              ].join(" ")
            }
          >
            {t}
          </span>
        );
        if (!isInteractive) return (
          <span key={t} className="inline-block">{pill}</span>
        );
        return (
          <button key={t} type="button" onClick={() => onSelect?.(t)} className="hover:bg-black/5 dark:hover:bg-white/10 rounded">
            {pill}
          </button>
        );
      })}
    </div>
  );
}

