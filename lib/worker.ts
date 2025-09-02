export async function chat(question: string): Promise<string> {
  const url = process.env.NEXT_PUBLIC_WORKER_URL;
  if (!url) throw new Error('NEXT_PUBLIC_WORKER_URL is not set');

  const controller = new AbortController();
  const to = setTimeout(()=>controller.abort(), 3000);

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({ question }),
      signal: controller.signal
    });

    const text = await r.text();
    let msg = '';
    try {
      const json = JSON.parse(text);
      msg = json?.answer || json?.message || json?.reply || '';
    } catch {
      msg = text || '';
    }

    if (!r.ok) {
      if (r.status === 429) {
        return 'Free tier limit reached. Please wait a minute or sign in to continue.';
      }
      return msg || `Request failed (${r.status}).`;
    }
    return msg || '…';
  } finally {
    clearTimeout(to);
  }
}
