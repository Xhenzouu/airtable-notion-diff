import { cn } from "@/lib/utils";
import { syncRunsData, type RunStatus } from "./mockData";

const badge: Record<RunStatus, string> = {
  success: "bg-success/15 text-success",
  partial: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
};

export function RunHistoryTable() {
  const cols = ["Date", "Status", "Created", "Updated", "Skipped", "Conflicts"];
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>{cols.map((c) => <th key={c} className="px-4 py-3 font-medium">{c}</th>)}</tr>
        </thead>
        <tbody>
          {syncRunsData.map((r) => (
            <tr key={r.date} className="border-b border-border last:border-0">
              <td className="px-4 py-3">{r.date}</td>
              <td className="px-4 py-3"><span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", badge[r.status])}>{r.status}</span></td>
              {[r.created, r.updated, r.skipped, r.conflicts].map((n, i) => <td key={i} className="px-4 py-3 tabular-nums">{n}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
