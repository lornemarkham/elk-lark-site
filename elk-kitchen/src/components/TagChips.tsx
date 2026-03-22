type Props = {
  tags: string[];
  variant?: "primary" | "secondary";
};

const base =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

const styles = {
  primary: "bg-sage/15 text-sage ring-1 ring-sage/25",
  secondary: "bg-bark/5 text-bark/60 ring-1 ring-bark/10",
};

export function TagChips({ tags, variant = "primary" }: Props) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag}>
          <span className={`${base} ${styles[variant]}`}>{tag}</span>
        </li>
      ))}
    </ul>
  );
}
