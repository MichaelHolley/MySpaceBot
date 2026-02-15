# Agent Instructions

## Documentation & Knowledge

- Use `context7` tools for library and framework documentation searches.

## Development Workflow

- **Runner:** Use `bun` for executions (e.g., `bun run`, `bun index.ts`).
- **Testing:** Verify changes with `bun test`. Add tests in `*.test.ts` files.
- **Linting:** Execute `bun lint` (`oxlint`) to check for code quality.
- **Formatting:** Execute `bun fmt` (`oxfmt`) for style consistency.
- **TypeScript:** Strictly follow `tsconfig.json`. Use explicit typing for public APIs.

## Code Style & Principles

- **Patterns:** Mirror the implementation style in `infrastructure/octokit.ts`.
- **Modularity:** Ensure commands are decoupled from infrastructure logic.
- **Error Handling:** Always wrap Discord and GitHub API calls in try-catch blocks.
- **Security:** Do not commit `.env` or secrets. Use environment variables.
- **Clean Code:** Prioritize readability, DRY, and KISS principles.

## Git & Commits

- **Conventional Commits:** Prefix messages with `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, or `docs:`.
- **Atomic Commits:** Keep commits small and focused on a single change.

## Verification Checklist

1. Read existing code to understand patterns and constraints.
2. Implement features or fixes.
3. Run `bun test` to ensure no regressions.
4. Run `bun run lint` and `bun run fmt`.
5. Verify logic manually if a bot token is available in the environment.
