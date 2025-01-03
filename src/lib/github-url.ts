interface GitHubUrlParams {
  owner: string;
  repo: string;
  type: "issue" | "edit" | "blob";
  path?: string;
  title?: string;
  body?: string;
  labels?: string[];
  template?: string;
}

const GITHUB_BASE_URL = "https://github.com";
const GITHUB_OWNER = "codehagen";
const GITHUB_REPO = "prismui";

/**
 * Generates a GitHub URL for issues, editing, or viewing files
 * @param params Configuration for generating the GitHub URL
 * @returns Formatted GitHub URL string
 */
export function getGitHubUrl(params: GitHubUrlParams): string {
  const { owner, repo, type, path, ...issueParams } = params;

  if (type === "issue") {
    const baseUrl = `${GITHUB_BASE_URL}/${owner}/${repo}/issues/new`;
    const urlParams = new URLSearchParams();

    Object.entries(issueParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => urlParams.append(key, item));
      } else if (value !== undefined) {
        urlParams.append(key, value.toString());
      }
    });

    return `${baseUrl}?${urlParams.toString()}`;
  }

  if (type === "edit") {
    return `${GITHUB_BASE_URL}/${owner}/${repo}/edit/main/${path || ""}`;
  }

  // Default to blob (view file)
  return `${GITHUB_BASE_URL}/${owner}/${repo}/blob/main/${path || ""}`;
}

/**
 * Gets the documentation file URL on GitHub
 * @param slug The documentation page slug
 * @returns GitHub URL for the documentation file
 */
export function getDocsGitHubUrl(slug?: string): string {
  if (!slug) return `${GITHUB_BASE_URL}/${GITHUB_OWNER}/${GITHUB_REPO}`;

  // Remove leading /docs if present
  const cleanSlug = slug.replace(/^\/docs\/?/, "");
  const path = cleanSlug
    ? `src/content/docs/${cleanSlug}.mdx`
    : "src/content/docs/index.mdx";

  return getGitHubUrl({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    type: "blob",
    path,
  });
}

/**
 * Gets the GitHub issue URL with pre-filled template
 * @param title Optional issue title
 * @param body Optional issue body
 * @param labels Optional issue labels
 * @returns GitHub new issue URL
 */
export function getDocsIssueUrl(
  title?: string,
  body?: string,
  labels?: string[]
): string {
  const cleanTitle = `🐛 Bug: Documentation - ${title || "Issue"}`;

  const cleanBody = `### Page
${title || "Documentation Page"}

### Describe the bug
[Please describe the documentation issue you found]

### Additional context
- Found on: ${body || "Documentation page"}
- Environment: [Production/Development]
- Browser: [e.g., Chrome, Firefox, Safari]

### Expected documentation
[What did you expect to find in the documentation?]

### Actual documentation
[What did you actually find or what was missing?]`;

  return getGitHubUrl({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    type: "issue",
    title: cleanTitle,
    body: cleanBody,
    labels: ["👀 Exploration Pending", "🐛 bug"],
  });
}
