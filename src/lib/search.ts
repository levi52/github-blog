import type { PostData } from "./post-types";

/**
 * Full-text search over generated post data.
 *
 * Posts carry a plain-text `searchBody` produced by scripts/generate-posts.js,
 * so this runs entirely client-side with no search index or network call.
 * Matching is case-insensitive substring matching; results are ranked by where
 * the first hit lands (title > tags/categories > summary > body) so a title
 * match never gets buried under a body mention.
 */

export interface PostSearchResult {
  post: PostData;
  /** Excerpt around the first body match, when the hit came from `searchBody`. */
  snippet?: string;
}

const SNIPPET_RADIUS = 90;

function includesQuery(haystack: string | undefined, query: string): boolean {
  return !!haystack && haystack.toLowerCase().includes(query);
}

function rank(post: PostData, query: string): number {
  if (includesQuery(post.title, query)) return 0;
  if (
    post.tags.some((tag) => includesQuery(tag, query)) ||
    post.categories.some((category) => includesQuery(category, query))
  ) {
    return 1;
  }
  if (includesQuery(post.summary, query)) return 2;
  if (includesQuery(post.searchBody, query)) return 3;
  return -1;
}

/**
 * Excerpt centred on the first body match, trimmed to whole-word boundaries
 * where possible. Returns undefined when the body has no match.
 */
export function buildSnippet(body: string | undefined, query: string): string | undefined {
  if (!body || !query) return undefined;

  const index = body.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return undefined;

  let start = Math.max(0, index - SNIPPET_RADIUS);
  let end = Math.min(body.length, index + query.length + SNIPPET_RADIUS);

  // Nudge the window to whitespace so the excerpt does not start mid-word.
  if (start > 0) {
    const space = body.indexOf(" ", start);
    if (space !== -1 && space < index) start = space + 1;
  }
  if (end < body.length) {
    const space = body.lastIndexOf(" ", end);
    if (space !== -1 && space > index + query.length) end = space;
  }

  return `${start > 0 ? "…" : ""}${body.slice(start, end).trim()}${end < body.length ? "…" : ""}`;
}

export function searchPostsWithResults(posts: PostData[], query: string): PostSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return posts.map((post) => ({ post }));

  const normalized = trimmed.toLowerCase();

  return posts
    .map((post) => ({ post, score: rank(post, normalized) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => a.score - b.score)
    .map(({ post, score }) => ({
      post,
      snippet: score === 3 ? buildSnippet(post.searchBody, trimmed) : undefined,
    }));
}
