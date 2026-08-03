import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub proxy
 * ------------
 * GET /api/github?repo=owner/name
 *
 * Holds the read-only token server-side (env GITHUB_TOKEN) so it never reaches
 * the browser and so we get authenticated rate limits (5000/hr vs 60/hr).
 * Returns a normalized payload consumed by <GitHubPanel />.
 *
 * Set GITHUB_TOKEN in .env.local (dev) and in Azure Static Web Apps app settings.
 * A classic PAT with "public_repo" (read) scope is enough for public repos.
 */

export const revalidate = 1800; // cache upstream results for 30 min

const GH = "https://api.github.com";

function ghHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "dev-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get("repo");
  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return NextResponse.json(
      { error: "Provide ?repo=owner/name" },
      { status: 400 }
    );
  }

  try {
    const [metaRes, langRes, commitsRes] = await Promise.all([
      fetch(`${GH}/repos/${repo}`, {
        headers: ghHeaders(),
        next: { revalidate },
      }),
      fetch(`${GH}/repos/${repo}/languages`, {
        headers: ghHeaders(),
        next: { revalidate },
      }),
      // per_page=1 + Link header gives us the total commit count cheaply
      fetch(`${GH}/repos/${repo}/commits?per_page=1`, {
        headers: ghHeaders(),
        next: { revalidate },
      }),
    ]);

    if (metaRes.status === 404) {
      return NextResponse.json({ error: "Repo not found" }, { status: 404 });
    }
    if (!metaRes.ok) {
      return NextResponse.json(
        { error: `GitHub error ${metaRes.status}` },
        { status: 502 }
      );
    }

    const meta = await metaRes.json();
    const languagesRaw: Record<string, number> = langRes.ok
      ? await langRes.json()
      : {};

    // Compute language percentages
    const total = Object.values(languagesRaw).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(languagesRaw)
      .sort((a, b) => b[1] - a[1])
      .map(([name, bytes]) => ({
        name,
        bytes,
        pct: Math.round((bytes / total) * 1000) / 10,
      }));

    // Total commits from the Link header ("...&page=N>; rel=\"last\"")
    let commits: number | null = null;
    const link = commitsRes.headers.get("link");
    if (link) {
      const m = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      if (m) commits = parseInt(m[1], 10);
    } else if (commitsRes.ok) {
      const arr = await commitsRes.json();
      commits = Array.isArray(arr) ? arr.length : null;
    }

    return NextResponse.json(
      {
        fullName: meta.full_name,
        description: meta.description,
        htmlUrl: meta.html_url,
        homepage: meta.homepage || null,
        stars: meta.stargazers_count,
        forks: meta.forks_count,
        watchers: meta.subscribers_count ?? meta.watchers_count,
        openIssues: meta.open_issues_count,
        defaultBranch: meta.default_branch,
        pushedAt: meta.pushed_at,
        createdAt: meta.created_at,
        primaryLanguage: meta.language,
        topics: meta.topics ?? [],
        license: meta.license?.spdx_id ?? null,
        commits,
        languages,
      },
      { headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to reach GitHub" },
      { status: 502 }
    );
  }
}
