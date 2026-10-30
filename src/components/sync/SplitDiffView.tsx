import { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { conflictRecord, type RecordFields } from "./mockData";

const keys = Object.keys(conflictRecord.airtable) as (keyof RecordFields)[];
const conflicts = new Set(keys.filter((k) => k !== "Last Modified" && conflictRecord.airtable[k] !== conflictRecord.notion[k]));

function Column({ title, data }: { title: string; data: RecordFields }) {
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

const Pill = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-warning px-3 py-1 text-xs font-semibold text-primary-foreground">
    <AlertTriangle className="h-3 w-3" /> Conflict · {conflicts.size} fields
  </span>
);

export function SplitDiffView() {
  const [resolved, setResolved] = useState<string | null>(null);
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex justify-center border-b border-border p-3"><Pill /></div>
      <div className="flex flex-col md:flex-row">
        <Column title="Airtable Record" data={conflictRecord.airtable} />
        <div className="hidden w-px bg-border md:block" />
        <div className="h-px bg-border md:hidden" />
        <Column title="Notion Record" data={conflictRecord.notion} />
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-muted/50 p-4">
        {resolved ? (
          <p className="flex items-center gap-2 text-sm text-success"><Check className="h-4 w-4" /> Resolved: {resolved}</p>
        ) : <p className="text-sm text-muted-foreground">Record {conflictRecord.id}</p>}
        <div className="ml-auto flex flex-wrap gap-2">
          {["Keep Airtable version", "Keep Notion version"].map((l) => (
            <button key={l} onClick={() => setResolved(l)} className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent">{l}</button>
          ))}
          <button onClick={() => setResolved("Merge Manually")} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Merge Manually</button>
        </div>
      </div>
    </div>
  );
}
