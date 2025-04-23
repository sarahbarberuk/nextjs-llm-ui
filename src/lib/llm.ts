export async function fetchSummarize(prompt: string): Promise<string> {
  const res = await fetch("http://localhost:8000/summarize/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to fetch summary");
  }

  const data = await res.json();
  return data.summary;
}

export async function fetchRewrite(prompt: string): Promise<string> {
  const res = await fetch("http://localhost:8000/rewrite/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }), // assuming the rewrite endpoint uses the same key
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to fetch rewrite");
  }

  const data = await res.json();
  return data.rewritten; // or data.result, depending on your actual API response
}
