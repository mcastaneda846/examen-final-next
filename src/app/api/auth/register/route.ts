import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { EmailService } from "@/services/email.service";
import { UserService } from "@/services/user.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await UserService.findByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Email no debe romper el registro si falla
    try {
      await EmailService.sendWelcomeEmail(
        user.email,
        user.name
      );
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500
      }
    );
  }
}