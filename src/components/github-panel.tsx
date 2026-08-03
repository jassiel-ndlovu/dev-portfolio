"use client";

import { useEffect, useState } from "react";

interface GitHubData {
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  defaultBranch: string;
  pushedAt: string;
  createdAt: string;
  primaryLanguage: string | null;
  topics: string[];
  license: string | null;
  commits: number | null;
  languages: { name: string; bytes: number; pct: number }[];
}

// Deterministic color per language name so bars stay stable across renders.
const langPalette = [
  "#f5a524",
  "#17c3b2",
  "#8b5cf6",
  "#3a86ff",
  "#ef6461",
  "#ff6bcb",
  "#22c55e",
  "#eab308",
];
function langColor(name: string, i: number) {
  return langPalette[i % langPalette.length];
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <div className="font-display text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

export function GitHubPanel({ repo }: { repo: string }) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    // Reset asynchronously (not synchronously in the effect body) so a repo
    // change re-triggers the loading skeleton without cascading renders.
    Promise.resolve().then(() => {
      setLoading(true);
      setError(null);
    });
    fetch(`/api/github?repo=${encodeURIComponent(repo)}`, {
      signal: ctrl.signal,
    })
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json.error || "Failed to load");
        return json as GitHubData;
      })
      .then((d) => setData(d))
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [repo]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-border" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-border/60" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted">
        <p className="mb-1 font-medium text-foreground">
          Live GitHub data unavailable
        </p>
        <p>
          {error}. Point this project&apos;s <code>github</code> field at a real{" "}
          <code>owner/repo</code> and set <code>GITHUB_TOKEN</code>.
        </p>
        <a
          className="mt-2 inline-block underline hover:text-foreground"
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub →
        </a>
      </div>
    );
  }

  if (!data) return null;

  const updated = new Date(data.pushedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <a
          href={data.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm font-medium hover:underline"
        >
          {data.fullName} ↗
        </a>
        <span className="text-xs text-muted">Updated {updated}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Stars" value={data.stars} />
        <Stat label="Forks" value={data.forks} />
        <Stat label="Commits" value={data.commits ?? "—"} />
        <Stat label="Watchers" value={data.watchers} />
      </div>

      {data.languages.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 text-xs uppercase tracking-wide text-muted">
            Languages
          </div>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full">
            {data.languages.map((l, i) => (
              <div
                key={l.name}
                title={`${l.name} ${l.pct}%`}
                style={{ width: `${l.pct}%`, background: langColor(l.name, i) }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {data.languages.slice(0, 6).map((l, i) => (
              <span key={l.name} className="flex items-center gap-1.5 text-muted">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: langColor(l.name, i) }}
                />
                {l.name} <span className="tabular-nums">{l.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {data.topics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {data.topics.map((t) => (
            <span
              key={t}
              className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
