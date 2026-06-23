import { NextResponse } from "next/server";

import { FavoriteService } from "@/services/favorite.service";
import { getCurrentUser } from "@/utils/getCurrentUser";

export async function GET() {
  const user =
    await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const favorites =
    await FavoriteService.getFavorites(
      (user as any).id
    );

  return NextResponse.json(
    favorites
  );
}

export async function POST(
  req: Request
) {
  const user =
    await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body =
    await req.json();

  const favorite =
    await FavoriteService.addFavorite(
      (user as any).id,
      body.recipeId
    );

  return NextResponse.json(
    favorite
  );
}

export async function DELETE(
  req: Request
) {
  const user =
    await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body =
    await req.json();

  await FavoriteService.removeFavorite(
    (user as any).id,
    body.recipeId
  );

  return NextResponse.json({
    success: true,
  });
}