import { NextRequest, NextResponse } from "next/server";
import type { SearchResult } from "@/lib/types";

interface RawgGame {
  id: number;
  name: string;
  background_image: string | null;
  released: string | null;
  platforms?: { platform: { name: string } }[];
}

interface RawgResponse {
  results: RawgGame[];
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Requête trop courte" }, { status: 400 });
  }

  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    const webLinks = [
      {
        name: "RAWG",
        url: `https://rawg.io/games?query=${encodeURIComponent(query)}`,
      },
      {
        name: "Steam",
        url: `https://store.steampowered.com/search/?term=${encodeURIComponent(query)}`,
      },
      {
        name: "Metacritic",
        url: `https://www.metacritic.com/search/${encodeURIComponent(query)}/`,
      },
      {
        name: "IGDB",
        url: `https://www.igdb.com/search?q=${encodeURIComponent(query)}`,
      },
    ];

    return NextResponse.json({
      results: [] as SearchResult[],
      webLinks,
      message: "Ajoutez RAWG_API_KEY dans .env.local pour la recherche intégrée",
    });
  }

  const url = new URL("https://api.rawg.io/api/games");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("search", query);
  url.searchParams.set("page_size", "12");

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Erreur API RAWG" }, { status: 502 });
  }

  const data = (await res.json()) as RawgResponse;
  const results: SearchResult[] = data.results.map((g) => ({
    id: g.id,
    title: g.name,
    coverUrl: g.background_image,
    released: g.released,
    platforms: g.platforms?.map((p) => p.platform.name) ?? [],
  }));

  return NextResponse.json({ results, webLinks: [] });
}
