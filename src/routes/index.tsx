import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar, type View } from "@/components/sync/Sidebar";
import { MetricCards } from "@/components/sync/MetricCards";
import { SplitDiffView } from "@/components/sync/SplitDiffView";
import { RunHistoryTable } from "@/components/sync/RunHistoryTable";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Airtable ↔ Notion Sync Dashboard" },
      { name: "description", content: "Review sync conflicts side by side and track run history between Airtable and Notion." },
      { property: "og:title", content: "Airtable ↔ Notion Sync Dashboard" },
      { property: "og:description", content: "Review sync conflicts side by side and track run history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState<View>("conflicts");
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={cn(dark && "dark")}>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar view={view} onChange={setView} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <header className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl">Airtable ↔ Notion Sync</h1>
              <p className="text-sm text-muted-foreground">{view === "conflicts" ? "Conflict Viewer" : "Run History"}</p>
            </div>
            <button onClick={() => setDark((d) => !d)} aria-label="Toggle theme" className="rounded-md border border-border bg-card p-2 hover:bg-accent">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </header>
          {view === "conflicts" ? (
            <div className="space-y-6"><MetricCards /><SplitDiffView /></div>
          ) : <RunHistoryTable />}
        </main>
      </div>
    </div>
  );
}
