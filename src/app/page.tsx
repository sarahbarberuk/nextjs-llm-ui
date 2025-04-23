"use client";

import { useState } from "react";
import { fetchSummarize, fetchRewrite } from "@/lib/llm";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"summarize" | "rewrite">("summarize");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    console.log("Submitting:", mode, prompt);
    setLoading(true);
    setResult("");
    setError("");
    try {
      const output =
        mode === "summarize"
          ? await fetchSummarize(prompt)
          : await fetchRewrite(prompt);
      console.log("Result:", output);
      setResult(output);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">LLM UI</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <textarea
          className="w-full p-2 border rounded resize-none min-h-[100px]"
          placeholder="Enter your text here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setMode("summarize")}
            className={`px-4 py-2 rounded ${
              mode === "summarize" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Summarize
          </button>
          <button
            type="button"
            onClick={() => setMode("rewrite")}
            className={`px-4 py-2 rounded ${
              mode === "rewrite" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Rewrite
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={loading || !prompt.trim()}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && <div className="text-red-500">{error}</div>}
      {result && (
        <div className="w-full p-4 mt-4 border rounded bg-gray-50">
          <h2 className="font-semibold">Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
