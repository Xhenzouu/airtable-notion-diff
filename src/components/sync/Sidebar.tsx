import { ChevronLeft, ChevronRight, GitCompare, History, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export type View = "conflicts" | "history";

export function Sidebar({ view, onChange, collapsed, onToggle }: { view: View; onChange: (v: View) => void; collapsed: boolean; onToggle: () => void }) {
  const links = [
    { id: "conflicts" as const, label: "Conflict Viewer", icon: GitCompare },
    { id: "history" as const, label: "Run History", icon: History },
  ];
  return (
    <aside className={cn("shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all", collapsed ? "w-16" : "w-[260px]")}>
      <div className={cn("flex items-center gap-2 p-4", collapsed ? "flex-col" : "justify-between")}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <RefreshCw className="h-4 w-4" />
          </div>
          {!collapsed && <span className="font-serif text-lg">SyncLens</span>}
        </div>
        <button onClick={onToggle} aria-label="Toggle sidebar" className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="space-y-1 px-2">
        {links.map((l) => (
          <button key={l.id} onClick={() => onChange(l.id)} title={l.label}
            className={cn("flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              collapsed && "justify-center",
              view === l.id ? "bg-sidebar-accent font-medium" : "text-muted-foreground hover:bg-sidebar-accent/60")}>
            <l.icon className="h-4 w-4 shrink-0" />
            {!collapsed && l.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
