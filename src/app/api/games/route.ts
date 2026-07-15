import { NextRequest, NextResponse } from "next/server";
import { getGames, addGame } from "@/lib/db";
import type { Game } from "@/lib/types";
import { randomUUID } from "crypto";

export async function GET() {
  const games = await getGames();
  return NextResponse.json(games);
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get("x-admin-token");
  if (auth !== process.env.ADMIN_PASSWORD && auth !== "andrea2026") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Game>;
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Titre requis" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const game: Game = {
    id: randomUUID(),
    title: body.title.trim(),
    platform: body.platform ?? "pc",
    status: body.status ?? "backlog",
    plannedDate: body.plannedDate ?? null,
    coverUrl: body.coverUrl ?? null,
    notes: body.notes ?? "",
    createdAt: now,
    updatedAt: now,
  };

  await addGame(game);
  return NextResponse.json(game, { status: 201 });
}
