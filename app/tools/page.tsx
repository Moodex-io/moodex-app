// app/tools/page.tsx
import Link from "next/link";

export default function ToolsHub() {
  return (
    <main className="wrap py-16">
      <h1 className="text-3xl font-extrabold mb-6">Moodex Tools</h1>
      <p className="muted mb-10">Discover the mood of markets & make shareable mood content.</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-bold text-xl mb-2">Market Mood Analyzer</h2>
          <p className="muted mb-4">Enter a ticker or headline; get AI mood score + summary.</p>
          <Link href="/tools/analyze" className="btn btn-primary">Open</Link>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-xl mb-2">Mood Meme Generator</h2>
          <p className="muted mb-4">Describe your mood; get caption ideas for instant memes.</p>
          <Link href="/tools/meme" className="btn btn-primary">Open</Link>
        </div>
      </div>
    </main>
  );
}
