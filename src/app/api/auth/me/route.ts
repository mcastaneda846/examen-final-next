import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { verifyToken } from "@/utils/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          user: null,
        },
        {
          status: 401,
        }
      );
    }

    const decoded = verifyToken(token);

    return NextResponse.json(decoded);
  } catch {
    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 401,
      }
    );
  }
}