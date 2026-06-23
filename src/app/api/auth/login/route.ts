import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { UserService } from "@/services/user.service";
import { generateToken } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const user = await UserService.findByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
