export function getGithubToken(): string | undefined {
  return process.env.GITHUB_TOKEN;
}
