import { syncMetrics } from "./mockData";

export function MetricCards() {
  const items = [
    { label: "Last Synced", value: syncMetrics.lastSynced, cls: "text-lg" },
    { label: "Total Conflicts", value: syncMetrics.totalConflicts, cls: "text-3xl text-warning" },
    { label: "Orphaned Records", value: syncMetrics.orphanedRecords, cls: "text-3xl text-destructive" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((i) => (
        <div key={i.label} className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{i.label}</p>
          <p className={`mt-2 font-semibold tabular-nums ${i.cls}`}>{i.value}</p>
        </div>
      ))}
    </div>
  );
}
