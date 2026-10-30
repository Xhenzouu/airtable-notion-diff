import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { conflictRecord, type RecordFields } from "./mockData";

export type ConflictRecord = typeof conflictRecord;
const keys = Object.keys(conflictRecord.airtable) as (keyof RecordFields)[];
export const getConflicts = (r: ConflictRecord) =>
  new Set(keys.filter((k) => k !== "Last Modified" && r.airtable[k] !== r.notion[k]));

function Column({ title, data, conflicts }: { title: string; data: RecordFields; conflicts: Set<string> }) {
  return (
    <div className="flex-1 p-5">
      <h3 className="mb-4 font-serif text-lg">{title}</h3>
      <dl className="space-y-2">
        {keys.map((k) => {
          const c = conflicts.has(k);
          return (
            <div key={k} className={cn("rounded-md border px-3 py-2", c ? "border-warning bg-warning/15" : "border-border")}>
              <dt className={cn("text-xs uppercase tracking-wider", c ? "text-warning" : "text-muted-foreground")}>{k}</dt>
              <dd className="text-sm font-medium">{data[k]}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

const Pill = ({ count }: { count: number }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-warning px-3 py-1 text-xs font-semibold text-primary-foreground">
    <AlertTriangle className="h-3 w-3" /> Conflict · {count} fields
  </span>
);

const SyncedPill = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-success px-3 py-1 text-xs font-semibold text-primary-foreground">
    <Check className="h-3 w-3" /> Synced
  </span>
);

export function SplitDiffView({ record, onKeepAirtable, onKeepNotion, onReset }: {
  record: ConflictRecord; onKeepAirtable: () => void; onKeepNotion: () => void; onReset: () => void;
}) {
  const conflicts = getConflicts(record);
  const synced = conflicts.size === 0;
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex flex-col md:flex-row">
        <Column title="Airtable Record" data={record.airtable} conflicts={conflicts} />
        <div className="hidden w-px bg-border md:block" />
        <div className="h-px bg-border md:hidden" />
        <Column title="Notion Record" data={record.notion} conflicts={conflicts} />
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-muted/50 p-4">
        {synced ? (
          <div className="flex items-center gap-3">
            <SyncedPill />
            <button onClick={onReset} className="text-xs text-muted-foreground underline-offset-2 hover:underline">Reset Conflict</button>
          </div>
        ) : <Pill count={conflicts.size} />}
        <div className="ml-auto flex flex-wrap gap-2">
          {([["Keep Airtable version", onKeepAirtable], ["Keep Notion version", onKeepNotion]] as const).map(([l, fn]) => (
            <button key={l} onClick={fn} disabled={synced} className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50">{l}</button>
          ))}
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Merge Manually</button>
        </div>
      </div>
    </div>
  );
}
