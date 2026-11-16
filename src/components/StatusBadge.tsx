import type { RegistryStatus } from "@/data/registry";

const STYLE: Record<RegistryStatus, string> = {
  active: "bg-ok-soft text-ok",
  suspended: "bg-warn-soft text-warn",
  expired: "bg-bad-soft text-bad",
};

export default function StatusBadge({
  status,
  label,
}: {
  status: RegistryStatus;
  label: string;
}) {
  return (
    <span
      className={`inline-block rounded px-2 py-1 text-xs font-semibold whitespace-nowrap ${STYLE[status]}`}
    >
      {label}
    </span>
  );
}
