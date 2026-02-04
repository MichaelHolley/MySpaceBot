import { describe, expect, it, mock, spyOn } from "bun:test";
import { execute } from "./new-tech";

describe("new-tech command", () => {
  it("should reject usage in a guild", async () => {
    const interaction = {
      guildId: "123456789",
      reply: mock(async () => {}),
    } as any;

    await execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith({
      content: "❌ This command can only be used in Direct Messages (DMs).",
      ephemeral: true,
    });
  });

  it("should accept usage in DMs and log the submission", async () => {
    const consoleSpy = spyOn(console, "log").mockImplementation(() => {});
    const interaction = {
      guildId: null,
      options: {
        getString: mock((name: string) => {
          if (name === "title") return "Test Tech";
          if (name === "description") return "Test Description";
          return null;
        }),
      },
      user: {
        tag: "User#1234",
        id: "987654321",
      },
      reply: mock(async () => {}),
    } as any;

    await execute(interaction);

    expect(consoleSpy).toHaveBeenCalled();
    expect(interaction.reply).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.stringContaining("✅ **Technology Submission Received!**"),
        ephemeral: true,
      }),
    );

    consoleSpy.mockRestore();
  });
});
