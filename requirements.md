# Discord Bot Implementation Plan

## /new-tech Command - Product Requirements

### Implementation Todos

1. **Install discord.js dependency**
2. **Create .env file with Discord bot token and application ID**
3. **Create .env.example template file for environment variables**
4. **Set up basic Discord client in index.ts with login and ready event**
5. **Create /commands directory structure**
6. **Implement /new-tech slash command definition with title (required) and description (optional) parameters**
7. **Create command registration script to register /new-tech command with Discord API**
8. **Implement interaction handler for slash commands in index.ts**
9. **Add logic to handle /new-tech command: log to console and send confirmation message to user**
10. **Add DM-only restriction check (reject if command used in server channels)**
11. **Add error handling for command interactions**
12. **Test bot with /new-tech command in Discord DMs**

### Requirements Summary

**Command:** `/new-tech`

- **Parameters:**
  - `title` (required) - The name/title of the technology
  - `description` (optional) - Additional details about the technology

**Behavior:**

- Bot only responds in private messages (DMs)
- Logs submission details to console
- Sends formatted confirmation message back to user with entered tech details
- Rejects usage outside of DMs with helpful message

**Technology Stack:**

- Runtime: Bun
- Library: discord.js
- Language: TypeScript
