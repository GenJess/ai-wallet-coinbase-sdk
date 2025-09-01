"use client";
import { useState } from "react";

export default function StockflowPage() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOptions = async () => {
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/options?symbol=${symbol}`);
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const options = data?.optionChain?.result?.[0]?.options?.[0];

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">StockFlow Options</h1>
      <input
        className="border p-1 mr-2"
        placeholder="Ticker"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button
        onClick={fetchOptions}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Fetch
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {options && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Type</th>
                <th className="px-2 py-1 text-left">Strike</th>
                <th className="px-2 py-1 text-left">Last Price</th>
              </tr>
            </thead>
            <tbody>
              {options.calls.map((call: any) => (
                <tr key={`call-${call.contractSymbol}`}>
                  <td className="border px-2 py-1">Call</td>
                  <td className="border px-2 py-1">{call.strike}</td>
                  <td className="border px-2 py-1">{call.lastPrice}</td>
                </tr>
              ))}
              {options.puts.map((put: any) => (
                <tr key={`put-${put.contractSymbol}`}>
                  <td className="border px-2 py-1">Put</td>
                  <td className="border px-2 py-1">{put.strike}</td>
                  <td className="border px-2 py-1">{put.lastPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
