"use client";

import { useEffect, useState } from "react";
import Storyboard from "@/components/Storyboard";

export default function StoryboardPage() {
  const [engine, setEngine] = useState<any>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      const webllm = await import("@mlc-ai/web-llm");
      const eng = await webllm.CreateMLCEngine({
        model: "Llama-3-8B-Instruct-q4f32_1",
      });
      setEngine(eng);
    }
    init();
  }, []);

  async function send() {
    if (!engine || !input.trim()) return;
    setLoading(true);
    const res = await engine.chat.completions.create({
      messages: [...messages, { role: "user", content: input }],
    });
    const reply = res.choices[0].message.content as string;
    const newMessages = [
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: reply },
    ];
    setMessages(newMessages);
    const urls = reply.match(/https?:\/\/res\.cloudinary\.com[^\s\"]+/g) ?? [];
    if (urls.length) {
      setImages((prev) => {
        const merged = [...prev, ...urls];
        return merged.slice(0, 9);
      });
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Storyboard Assistant</h1>
      <Storyboard images={images} />
      <div className="space-y-2">
        <textarea
          className="w-full p-2 border border-gray-300 rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Ask for images or describe your scene"
        />
        <button
          onClick={send}
          disabled={!engine || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </div>
      <div className="space-y-1">
        {messages.map((m, i) => (
          <p key={i} className="text-sm">
            <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.content}
          </p>
        ))}
      </div>
    </div>
  );
}
