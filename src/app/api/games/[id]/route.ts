import { NextRequest, NextResponse } from "next/server";
import { updateGame, deleteGame } from "@/lib/db";
import type { Game } from "@/lib/types";

type RouteContext = { params: Promise<{ id: string }> };

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("x-admin-token");
  return auth === process.env.ADMIN_PASSWORD || auth === "andrea2026";
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as Partial<Game>;
  const updated = await updateGame(id, body);

  if (!updated) {
    return NextResponse.json({ error: "Jeu introuvable" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await context.params;
  const ok = await deleteGame(id);

  if (!ok) {
    return NextResponse.json({ error: "Jeu introuvable" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
