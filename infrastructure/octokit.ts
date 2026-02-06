import { Octokit } from "octokit";
import { getGithubToken } from "../util/get-github-token";

const octokit = new Octokit({
  auth: getGithubToken(),
});

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
