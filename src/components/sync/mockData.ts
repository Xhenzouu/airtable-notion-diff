export type RecordFields = { Name: string; Status: string; Priority: string; Owner: string; "Last Modified": string };

export const conflictRecord: { id: string; airtable: RecordFields; notion: RecordFields } = {
  id: "rec_8f2K91",
  airtable: { Name: "Q4 Partner Onboarding", Status: "In Progress", Priority: "High", Owner: "Dana Kim", "Last Modified": "Oct 30, 2026 · 08:42" },
  notion: { Name: "Q4 Partner Onboarding", Status: "Blocked", Priority: "Low", Owner: "Dana Kim", "Last Modified": "Oct 30, 2026 · 08:47" },
};

export const syncMetrics = { lastSynced: "Oct 30, 2026 · 09:05 UTC", totalConflicts: 7, orphanedRecords: 3 };

export type RunStatus = "success" | "partial" | "error";
export const syncRunsData: { date: string; status: RunStatus; created: number; updated: number; skipped: number; conflicts: number }[] = [
  { date: "Oct 30, 2026 · 09:05", status: "partial", created: 12, updated: 48, skipped: 4, conflicts: 7 },
  { date: "Oct 30, 2026 · 08:05", status: "success", created: 5, updated: 31, skipped: 0, conflicts: 0 },
  { date: "Oct 30, 2026 · 07:05", status: "error", created: 0, updated: 0, skipped: 112, conflicts: 0 },
];
