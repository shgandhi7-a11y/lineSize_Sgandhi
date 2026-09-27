import { createServerFn } from "@tanstack/react-start";

type Turn = { role: "user" | "assistant"; content: string };

function cleanTurn(item: unknown): Turn | null {
  if (!item || typeof item !== "object") return null;
  const row = item as { role?: unknown; content?: unknown };
  const content = String(row.content ?? "").trim().slice(0, 1500);
  if (!content) return null;
  return { role: row.role === "assistant" ? "assistant" : "user", content };
}

export const askLine = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const raw = (input ?? {}) as { question?: unknown; brief?: unknown; history?: unknown };
    const question = String(raw.question ?? "").trim().slice(0, 1200);
    if (!question) throw new Error("Type a question.");
    const brief = String(raw.brief ?? "").trim().slice(0, 2500);
    const history = Array.isArray(raw.history)
      ? raw.history.map(cleanTurn).filter((row): row is Turn => row !== null).slice(-6)
      : [];
    return { question, brief, history };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Grok is not available right now." };

    const messages = [
      {
        role: "system",
        content:
          "You are the line-sizing assistant in LineSpec. Answer questions on liquid and gas line size, pressure drop, velocity, pump or compressor power, NPSH, control valves, and hydraulic loops. Use the current case when it matters. The app uses Darcy–Weisbach with the Churchill friction factor. Be short, keep the user's units, and say when a number is a screening check rather than a final design. Do not invent vendor curves or code clauses. If the question is outside line sizing, say so in one line.",
      },
      {
        role: "system",
        content: data.brief ? `Current case on screen:\n${data.brief}` : "No case is open.",
      },
      ...data.history,
      { role: "user", content: data.question },
    ];

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.2,
          max_tokens: 700,
          messages,
        }),
      });
      if (!res.ok) return { ok: false as const, error: `Grok did not answer (${res.status}).` };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: false as const, error: "Grok returned an empty answer." };
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "Could not reach Grok." };
    }
  });
