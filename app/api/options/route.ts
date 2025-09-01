export async function GET(request: Request) {
  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol");

  if (!symbol) {
    return Response.json({ message: "Symbol is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://query2.finance.yahoo.com/v7/finance/options/${symbol}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch options data");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch options data" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
