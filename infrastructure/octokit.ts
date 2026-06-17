import { Octokit } from "octokit";
import { getGithubToken } from "../util/get-github-token";

const octokit = new Octokit({
  auth: getGithubToken(),
});

export async function createProjectIssue(
  title: string,
  description: string,
  name?: string | null,
  goals?: string | null,
): Promise<{ url: string; id: number }> {
  if (!getGithubToken()) {
    throw new Error("GitHub token is not configured.");
  }

  const body = [
    name ? `### Project Name\n${name}` : null,
    `### Description\n${description}`,
    goals ? `### Goals\n${goals}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const response = await octokit.rest.issues.create({
    owner: "michaelholley",
    repo: "MySpace",
    title,
    body,
    labels: ["project"],
  });

  return { url: response.data.html_url, id: response.data.number };
}

export async function createTechIssue(
  title: string,
  description?: string | null,
): Promise<{ url: string; id: number }> {
  if (!getGithubToken()) {
    throw new Error("GitHub token is not configured.");
  }

  const response = await octokit.rest.issues.create({
    owner: "michaelholley",
    repo: "MySpace",
    title: `${title}`,
    body: `### Description\n${description ? description : ""}`,
    labels: ["tech"],
  });

  return { url: response.data.html_url, id: response.data.number };
}
