const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchSummarize(prompt: string): Promise<string> {
  const res = await fetch(`${baseUrl}/summarize/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.detail || "Failed to fetch summary");
  }

  return body.summary;
}

export async function fetchRewrite(prompt: string): Promise<string> {
  const res = await fetch(`${baseUrl}/rewrite/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }), // assuming the rewrite endpoint uses the same key
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.detail || "Failed to fetch rewrite");
  }

  return body.rewritten;
}
