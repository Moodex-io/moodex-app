// lib/llm.ts
// Minimal wrapper around an LLM (OpenAI-compatible). Swap provider without touching routes.

export async function callLLM(opts: {
  system?: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const {
    OPENAI_API_BASE = 'https://api.openai.com/v1',
    OPENAI_API_KEY = '',
  } = process.env;

  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY missing');
  }

  // simple chat completion
  const r = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',           // pick your default
      temperature: opts.temperature ?? 0.3,
      max_tokens: opts.maxTokens ?? 400,
      messages: [
        opts.system ? { role: 'system', content: opts.system } : null,
        { role: 'user', content: opts.prompt }
      ].filter(Boolean)
    })
  });

  if (!r.ok) {
    const t = await r.text().catch(()=>'');
    throw new Error(`LLM error: ${r.status} ${t}`);
  }

  const json = await r.json();
  const content: string = json?.choices?.[0]?.message?.content ?? '';
  return content.trim();
}
