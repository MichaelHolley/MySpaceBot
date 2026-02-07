# MySpaceBot

A Discord bot designed to streamline GitHub backlog management. It allows you to quickly create issues in a private repository and automatically add them to a GitHub Project board via simple Discord commands—bypassing the complexity of the GitHub mobile app.

## Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Configure environment:**
   Create a `.env` file with the following:
   ```env
   DISCORD_TOKEN=your_discord_bot_token
   APPLICATION_ID=your_discord_application_id
   GITHUB_TOKEN=your_personal_access_token
   USER_ID=your_discord_user_id
   ```

3. **Run the bot:**
   ```bash
   bun run index.ts
   ```

## Usage

- `/new-tech`: Creates a new issue in the `michaelholley/MySpace` repository and adds it to Project #6.
- **Note**: For security, the bot only responds to Direct Messages from the authorized `USER_ID`.
